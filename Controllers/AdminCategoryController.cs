using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Dtos.Category;
using Ecommerce.Models;
using MySqlX.XDevAPI.CRUD;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminCategoryController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminCategoryController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/AdminCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/AdminCategory/5
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
        [HttpGet("SubCategories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetSubCategories()
        {
            // Filtrer les catégories qui n'ont pas d'enfants
            var filteredCategories = await _context.Categories
                .Where(c => !c.Inverseparent_categoryNavigation.Any())
                .ToListAsync();

            return filteredCategories;
        }
        
        // PUT: api/AdminCategory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category, [FromForm] string request)
        {
            Console.WriteLine(request);
            
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

        // POST: api/AdminCategory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromForm] CategoryDto categoryDto)
        {
            var category = new Category
            {
                name = categoryDto.Name,
                form_specification_sheet = categoryDto.form_specification_sheet
            };

            if (categoryDto.Image != null && categoryDto.Image.Length > 0)
            {
                // Générer un nom de fichier unique
                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(categoryDto.Image.FileName);

                // Définir le chemin de sauvegarde
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img/categories");
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Assurer que le dossier existe
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Vérifier si le fichier existe déjà
                if (System.IO.File.Exists(filePath))
                {
                    // Gérer la situation où le fichier existe déjà
                    return Conflict("Le fichier existe déjà.");
                }

                // Sauvegarder le fichier
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await categoryDto.Image.CopyToAsync(stream);
                }

                // Définir le chemin de l'image dans le modèle de catégorie
                category.image = $"{Request.Scheme}://{Request.Host}/img/categories/{uniqueFileName}";
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.id }, category);
        }


        
        //DELETE : api/AdminCategory/DeleteCategory/5
        // supprime la catégorie depuis sont id 
        
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(u => u.id == id);
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok("Catégorie supprimé");
        }



        public class CategoryUpdateTdo
        {
            public string name { get; set; }
            public string form_specification_sheet { get; set; }
            public int parent_category { get; set; }
            public string filters { get; set; }
            public string image { get; set; }
        }

        //PUT : api/AdminCategory/5g
       /* json : {
            "name":"nametest",
            "form_specification_sheet":"test",
            "parent_category":"3",
            "filters":"test",
            "image": "chemin/test"
        }*/
        
        [HttpPut("ChangeCategory/{id}")]
        public async Task<ActionResult> ChangeCategory(int id, [FromBody] CategoryUpdateTdo categoryUpdate)
        {
            var Category = await _context.Categories.FirstOrDefaultAsync(u => u.id == id); ;
            Category.name = categoryUpdate.name;
            Category.form_specification_sheet =  categoryUpdate.form_specification_sheet;
            Category.parent_category =  categoryUpdate.parent_category;
            Category.filters =  categoryUpdate.filters;
            Category.image =  categoryUpdate.image;
            await _context.SaveChangesAsync();
            return Ok("values changer avec succés");
        } 
        
        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.id == id);
        }
    }
}
