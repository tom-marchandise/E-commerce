using System.ComponentModel.DataAnnotations;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Models;
using Ecommerce.Helpers;
using Microsoft.Extensions.Options;
using Ecommerce.Mailer;
using Ecommerce.Dtos;
using Google.Apis.Util;
using Microsoft.CodeAnalysis.Classification;
using NuGet.Configuration;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly EmailService _emailService;
        private readonly TokenHelper _tokenHelper;
        private readonly ForgetPasswordService _forgetPasswordService;
        private readonly TokenBlacklistService _tokenBlacklistService;
        public AuthController(MyDbContext context, EmailService emailService, ForgetPasswordService forgetPasswordService, TokenHelper tokenHelper, TokenBlacklistService tokenBlacklistService)
        {
            _context = context;
            _emailService = emailService;
            _tokenHelper = tokenHelper;
            _forgetPasswordService = forgetPasswordService;
            _tokenBlacklistService = tokenBlacklistService;

        }

        // POST: api/Auth/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] RegisterRequest request)
        {
            if (request == null)
            {
                return BadRequest("Données de requête manquantes.");
            }

            var mailExist = await _context.Users.SingleOrDefaultAsync(u => u.email == request.Email);
            if (mailExist != null)
            {
                return BadRequest("L'adresse email est déjà utilisée.");
            }

            var user = new User
            {
                email = request.Email,
                password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                first_name = request.FirstName,
                last_name = request.LastName,
                phone_number = request.PhoneNumber,
                verified_email = false,
                role = "customers",
                created_at = DateTime.Now,
                updated_at = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            try
            {
                string otp = OtpHelper.GenerateOtp();
                user.otp = otp;
                user.otp_expiration = DateTime.Now.AddMinutes(15);
                _context.Attach(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                await _emailService.SendEmailAsync(user.email, otp, user.id);

                return CreatedAtAction(nameof(GetUser), new { id = user.id }, user);
            }
            catch (Exception ex)
            {
                var errorMessage = $"Erreur lors de l'envoi de l'email. Détails de l'exception : {ex.Message}";
                return StatusCode(StatusCodes.Status500InternalServerError, errorMessage);
            }
        }

        // POST: api/Auth/verify-otp
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            if (request == null)
            {
                return BadRequest("Données de requête manquantes.");
            }

            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return BadRequest("Utilisateur non trouvé.");
            }

            if (user.otp != request.Otp || user.otp_expiration < DateTime.Now)
            {
                return BadRequest("OTP invalide ou expiré.");
            }

            user.verified_email = true;
            user.otp = null;
            user.otp_expiration = null;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            var token = _tokenHelper.GenerateToken(user.id, user.first_name, user.role, user.email);

            return Ok(new { Token = token });
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null)
            {
                return BadRequest("Données de requête manquantes.");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.email == request.Email);
            if (user == null)
            {
                return BadRequest("Utilisateur non trouvé.");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.password);
            if (!isPasswordValid)
            {
                return BadRequest("Mot de passe incorrect.");
            }
    
            var token = _tokenHelper.GenerateToken(user.id, user.first_name, user.role, user.email);

            return Ok(new { Token = token, Message = "Connexion réussie." });
        }
        

        // POST: api/Auth/forget-password
        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("L'adresse e-mail est requise.");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.email == request.Email);
            if (user == null)
            {
                return NotFound("Utilisateur non trouvé.");
            }

            try
            {
                await _forgetPasswordService.SendForgotPasswordEmailAsync(user.email);
                return Ok("Un email contenant le lien de réinitialisation a été envoyé.");
            }
            catch (Exception ex)
            {
                var errorMessage = $"Erreur lors de l'envoi de l'email. Détails de l'exception : {ex.Message}";
                return StatusCode(StatusCodes.Status500InternalServerError, errorMessage);
            }
        }

        // POST: api/Auth/reset-password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Token) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest("Des informations manquent pour réinitialiser le mot de passe.");
            }

            if (!_tokenHelper.ValidateResetToken(request.Token, out int userId))
            {
                return BadRequest("Jeton invalide ou expiré.");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.email == request.Email);
            if (user == null || user.id != userId)
            {
                return NotFound("Utilisateur non trouvé ou le jeton ne correspond pas à cet utilisateur.");
            }

            user.password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.updated_at = DateTime.Now;
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _tokenHelper.InvalidateResetToken(request.Token);
                return Ok("Mot de passe réinitialisé avec succès.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors de la réinitialisation du mot de passe : {ex.Message}");
            }
        }
        
        // POST: api/Auth/resend-reset-link
        [HttpPost("resend-reset-link")]
        public async Task<IActionResult> ResendResetLink([FromBody] ResendResetLinkRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("L'adresse e-mail est requise.");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.email == request.Email);
            if (user == null)
            {
                return NotFound("Utilisateur non trouvé.");
            }

            try
            {
                await _forgetPasswordService.SendForgotPasswordEmailAsync(user.email);
                return Ok("Un nouvel e-mail contenant le lien de réinitialisation a été envoyé.");
            }
            catch (Exception ex)
            {
                var errorMessage = $"Erreur lors de l'envoi de l'email. Détails de l'exception : {ex.Message}";
                return StatusCode(StatusCodes.Status500InternalServerError, errorMessage);
            }
        }


        
        // POST: api/Auth/blacklist-token
        [HttpPost("blacklist-token")]
        public async Task<IActionResult> BlacklistToken([FromBody] BlacklistTokenRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Token))
            {
                return BadRequest("Le token est requis.");
            }

            try
            {
                var expiration = DateTime.UtcNow.AddDays(7);
                await _tokenBlacklistService.BlacklistTokenAsync(request.Token, expiration);
                return Ok("Token blacklisté avec succès.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erreur lors du blacklistage du token : {ex.Message}");
            }
        }

        // GET: api/Auth/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Auth/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        
            return NoContent();
        }

        // DELETE: api/Auth/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.id == id);
        }
        
        public class AddressesDto
        {
            public string street { get; set; }
            public string city { get; set; }
            public string zipcode { get; set; }
            public string country { get; set; }
            public string? state { get; set; }
            public int user_id { get; set; }
        } 

        //put : /api/Auth/CreateAdressUser
        /*
         * json:
         * {
         * "street" : "test",
         * "city" : "test",
         * "zipcode" : "test",
         * "country" : "country",
         * "state" : "test",
         * "user_id" : "5"
         * }
         */
        
        [HttpPut("CreateAddressUser")]
        public async Task<IActionResult> CreateAddressUser([FromBody] AddressesDto address)
        {
            
            var adresses = await _context.Addresses.FirstOrDefaultAsync(u => u.user_id == address.user_id); ;
            
            if (_context.Addresses.Where(u => u.user_id == address.user_id).Any())
            {
               
                
                adresses.street = string.IsNullOrEmpty(address.street) ?  adresses.street : address.street;
                adresses.city = string.IsNullOrEmpty(address.city) ?  adresses.city : address.city;
                adresses.zipcode = string.IsNullOrEmpty(address.zipcode) ?  adresses.zipcode : address.zipcode;
                adresses.country = string.IsNullOrEmpty(address.country) ?  adresses.country : address.country;
                adresses.user_id = address.user_id;
                
                await _context.SaveChangesAsync();
                return Ok("values changer avec succés");
            }
            else
            {
                var newAdd = new Address()
                {
                    street = address.street,
                    city = address.city,
                    zipcode = address.zipcode,
                    country = address.country,
                    state = address.state,
                    user_id = address.user_id,
                    
                };
            
                _context.Addresses.Update(newAdd);
            
                await _context.SaveChangesAsync();
                return Ok("nouvelle values creer avec succés");
               
            }
        }

        ///get: api/Auth/GetAddress/108
    
        [HttpGet("GetAddress/{id}")]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            var address = _context.Addresses.Where(p => p.user_id == id);
            
            return Ok(address);
        }
        
        public class UserDto
        {
            public string firstname { get; set; }
            public string lastname { get; set; }
            public string email { get; set; }
            public string phone { get; set; }
            public int id { get; set; }
        }
        
        //put : /api/Auth/CreateAdressUser
        /*
         * json:
         * {
         * "firstname" : "test",
         * "lastname" : "test",
         * "email" : "test",
         * "phone" : "country",
         * "id" : "5",
         * }
         */
         
        [HttpPut("ChangeUser")]
        public async Task<IActionResult> ChangeUser([FromBody] UserDto user)
        {
            
            var userFound = await _context.Users.FirstOrDefaultAsync(u => u.id == user.id);
            
            userFound.first_name = string.IsNullOrEmpty(user.firstname) ?  userFound.first_name : user.firstname;
            userFound.last_name = string.IsNullOrEmpty(user.lastname) ?  userFound.last_name : user.lastname;
            userFound.email = string.IsNullOrEmpty(user.email) ? userFound.email : user.email;
            userFound.phone_number = string.IsNullOrEmpty(user.phone) ? userFound.phone_number : user.phone;
            
            await _context.SaveChangesAsync();
            return Ok("values changer avec succés");
           
        }

    }
}
