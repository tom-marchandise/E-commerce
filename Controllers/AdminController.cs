
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        
        public AdminController(MyDbContext context)
        {
            _context = context;
        }
        
        
        //GET : api/Admin/GetCount
        [HttpGet("GetCount")]

        public async Task<ActionResult<IEnumerable<User>>> GetCount()
        {
            var date = DateTime.Now.ToString("dd");
            var firstWeek = Int32.Parse(date) - 7;
            var secondWeek = Int32.Parse(date) - 14;
            
        //select count(created_at) from Users WHERE DAY(created_at) > actualDate;        
        
        var countDaysFirstWeek = _context.Users
            .FromSqlRaw("SELECT created_at FROM Users WHERE DAY(created_at) > {0}", firstWeek).Count();
        
        var countDaysSecondWeek = _context.Users
            .FromSqlRaw("SELECT created_at FROM Users WHERE DAY(created_at) > {0}", secondWeek).Count();

        //SELECT SUM(incrementation) FROM Products;
        var incrementation = _context.Products.Sum(p => p.incrementation);
        
        
        /*
        var countComputer = await _context.Categories
            .Where(p => p.parent_category == 1)
            .CountAsync();

        var countComposant = await _context.Categories
            .Where(p => p.parent_category == 8)
            .CountAsync();

        
        var countPeripherique = await _context.Categories
            .Where(p => p.parent_category == 26)
            .CountAsync();
            */
        
        
           var result = new 
           {
               User = _context.Users.Count(),
               Category = _context.Categories.Count(),
               Product = _context.Products.Count(),
               UserSince7days = firstWeek,
               userSince14days = secondWeek,
               ViewNumber = incrementation,
               /*Ordinateur = countComputer,
               Composant = countComposant,
               Peripherique = countPeripherique*/
           };
           
           return Ok(result);
        }
        

    }
}