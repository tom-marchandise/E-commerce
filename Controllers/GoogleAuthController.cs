using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Models;
using Ecommerce.Helpers;
using Ecommerce.Dtos;
using Google.Apis.Auth;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleAuthController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly TokenHelper _tokenHelper;

        public GoogleAuthController(MyDbContext context, TokenHelper tokenHelper)
        {
            _context = context;
            _tokenHelper = tokenHelper;
        }

        // POST: api/GoogleAuth/google
        [HttpPost("google")]
        public async Task<ActionResult<User>> Register([FromBody] GoogleAuthRequest request)
        {
            try
            {
                var payload = await _tokenHelper.ValidateGoogleTokenAsync(request.TokenId);
                if (payload == null)
                {
                    return BadRequest(new { message = "Invalid Google token." });
                }

                // récupération des info user depuis le payload google
                // n'arrive pas encore à recup given name et name
                string emailToUse = payload.Email;
                string givenName = payload.GivenName ?? "DefaultFirstName";
                string name = payload.Name ?? "DefaultLastName";

                var user = await _context.Users.FirstOrDefaultAsync(u => u.email == emailToUse);
                if (user == null)
                {
                    user = new User
                    {
                        first_name = givenName,
                        last_name = name,
                        email = emailToUse,
                        verified_email = true,
                        created_at = DateTime.UtcNow,
                        updated_at = DateTime.UtcNow,
                        role = "customers",
                        password = null,
                        phone_number = null
                    };

                    _context.Users.Add(user);

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateException dbEx)
                    {
                        return StatusCode(500, new { message = $"Database update error: {dbEx.InnerException?.Message}" });
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
                    }
                }

                return Ok(new
                {
                    user,
                    googleToken = request.TokenId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
            }
        }
    }
}
