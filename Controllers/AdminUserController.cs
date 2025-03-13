using Ecommerce.Context;
using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Construction;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AdminUserController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminUserController(MyDbContext context)
        {
            _context = context;
        }

         // GET : api/AdminUser
         //retourne les info users
        [HttpGet]

        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.Users.Select(p => new User() {
                id = p.id, 
                first_name = p.first_name, 
                last_name = p.last_name, 
                role = p.role, 
                email = p.email,
                phone_number = p.phone_number,
                Addresses = p.Addresses 
            }).ToListAsync();
        }

        // PUT : api/AdminUser/ChangeRole/5
        // change un admin en customers / customers en admin.
        [HttpPut("ChangeRole/{id}")]
        public async Task<ActionResult<IEnumerable<User>>> ChangeRole(int id)
        {
            var role = _context.Users.Where(p => p.id == id).Select(p => p.role).FirstOrDefault();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.id == id);
            string response;
            if (role == "customers")
            {
                user.role = "admin";
                response = "customers changé avec succés en admin";
                await _context.SaveChangesAsync();
                return Ok(response);
            } else if (role  == "admin")
            {
                user.role = "customers";
                response = "admin changé avec succés en customers";
                await _context.SaveChangesAsync();
                return Ok(response);
            }
            return Ok();
        }


        //DELETE : api/AdminUser/DeleteUser/5
        // supprime un customers depuis sont id , impossible de supprimer un admin 
        
        [HttpDelete("DeleteUser/{id}")]

        public async Task<IActionResult> DeleteUser(int id)
        {
            var role = _context.Users.Where(p => p.id == id).Select(p => p.role).FirstOrDefault();
            
            if (role == "customers")
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.id == id);
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                var response = "utilisateur supprimé avec succés";
                return Ok(response);
            } else if (role  == "admin")
            {
                var response = "un utilisateur admin ne peut être supprimer";
                return Ok(response);
            }

            return Ok();
        }
        
        public class UserUpdateDto
        {
            public string Email { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string PhoneNumber { get; set; }
        }

        //PUT : api/AdminUser/ChangeValues/5
        //json: {
        //     "Email": "email@.test",
        //     "FirstName": "testprenom",
        //     "LastName": "testnomdefamille",
        //     "PhoneNumber": "0763109557"
        // }
        // change les valeurs d'un utilisateur inscrit;
        
        [HttpPut("ChangeValues/{id}")]

        public async Task<IActionResult> ChangeValues(int id, [FromBody] UserUpdateDto userUpdate)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.id == id); ;
            
            user.email = userUpdate.Email;
            user.first_name = userUpdate.FirstName;
            user.last_name = userUpdate.LastName;
            user.phone_number = userUpdate.PhoneNumber;
            await _context.SaveChangesAsync();
            return Ok("values changer avec succés");
        }
        
        
    }

}