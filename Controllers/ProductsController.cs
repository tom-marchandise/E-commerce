using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Dtos;
using Ecommerce.Models;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProductsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Products/Category/{category}
        [HttpGet("Category/{category}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategory(string category)
        {
            var products = await _context.Products
                .Include(p => p.category)
                .Include(p => p.Promotions)
                .Where(p => p.category.name.Contains(category))
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/Products/Category/Limited/4/Name/Logitech G Pro X
        [HttpGet("Category/Limited/{id}/Name/{name}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategoryLimited(int id, string name)
        {
            var products = await _context.Products
                .Include(p => p.category)
                .Include(p => p.Promotions)
                .Where(p => p.category_id == id)
                .Where(p => p.name.Contains(name))
                .Take(5)
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/Products/Category/Top/{category}
        [HttpGet("Category/Top/{category}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetTopByCategory(string category)
        {
            var products = await _context.Products
                .Include(p => p.category)
                .Where(p => p.category.name.Contains(category))
                .OrderByDescending(p => p.incrementation)
                .Take(5)
                .ToListAsync();

            return Ok(products);
        }
        
        //GET: api/Products/Name/{name}
        [HttpGet("Name/{name}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByName(string name)
        {
            var products = await _context.Products
                .Include(p => p.category)
                .Where(p => p.name.Contains(name))
                .Take(5)
                .ToListAsync();
            return Ok(products);
        }
        
        //GET: api/Products/ByModelName/{name}
        [HttpGet("ByModelName/{name}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByModelName(string name)
        {
            var products = await _context.Products
                .Where(p => p.model == name)
                .Include(p => p.category)
                .ToListAsync();
            return Ok(products);
        }

        // GET : api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetProduct(int id)
        {
            Console.WriteLine($"Received request for Product ID: {id}");

            var product = await _context.Products
                .Where(p => p.id == id)
                .Include(p => p.category)
                .Include( p => p.brand)
                .Select(p => new 
                { 
                    p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.image,
                    p.stocks,
                    p.main_specs,
                    p.model,
                    p.created_at,
                    p.updated_at,
                    p.incrementation,
                    p.specification_sheet,
                    p.width,
                    p.weight,
                    p.height,
                    p.length,
                    BrandName = p.brand.name,
                    CategoryName = p.category.name
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        // PUT: api/Products/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // DELETE: api/Products/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.id == id);
        }
    }
}