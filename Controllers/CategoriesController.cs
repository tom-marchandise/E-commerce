using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Models;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoriesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }
        
        // GET: api/Categories/Name/Ordinateurs gaming
        [HttpGet("Name/{name}")]
        public async Task<ActionResult<Product>> GetCategoryByName(string name)
        {
            var categories = await _context.Categories
                .Where(cat => cat.name == name)
                .Include(cat => cat.Products)
                .GroupJoin(
                    _context.Categories,
                    category => category.id,
                    child_category => child_category.parent_category,
                    (category, childCategories) => new { category, childCategories }
                )
                .SelectMany(
                    x => x.childCategories.DefaultIfEmpty(),
                    (x, child_category) => new { x.category, child_category }
                )
                .GroupJoin(
                    _context.Categories,
                    result => result.category.parent_category,
                    parent_category => parent_category.id,
                    (result, parentCategories) => new { result.category, result.child_category, parentCategories }
                )
                .SelectMany(
                    x => x.parentCategories.DefaultIfEmpty(),
                    (x, parent_category) => new { x.category, x.child_category, parent_category }
                )
                .GroupJoin(
                    _context.Categories,
                    result => result.parent_category.parent_category,
                    grandparent_category => grandparent_category.id,
                    (result, grandparentCategories) => new { result.category, result.child_category, result.parent_category, grandparentCategories }
                )
                .SelectMany(
                    x => x.grandparentCategories.DefaultIfEmpty(),
                    (x, grandparent_category) => new { x.category, x.child_category, x.parent_category, grandparent_category }
                )
                .GroupJoin(
                    _context.Categories,
                    result => result.child_category.id,
                    grandchild_category => grandchild_category.parent_category,
                    (result, grandchildCategories) => new { result.category, result.child_category, result.parent_category, result.grandparent_category, grandchildCategories }
                )
                .SelectMany(
                    x => x.grandchildCategories.DefaultIfEmpty(),
                    (x, grandchild_category) => new
                    {
                        Category = x.category,
                        ChildCategory = x.child_category,
                        ParentCategory = x.parent_category,
                        GrandParentCategory = x.grandparent_category,
                        GrandChildCategory = grandchild_category
                    }
                ).ToListAsync();
                

            if (categories == null)
            {
                return NotFound();
            }

            return Ok(categories);
        }
        
        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.id }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.id == id);
        }
    }
}
