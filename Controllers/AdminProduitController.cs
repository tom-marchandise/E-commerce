using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Models;
using Newtonsoft.Json.Linq;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminProduitController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminProduitController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/AdminProduit
        //prend tt les produits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/AdminProduit/5
        //le produit dont l'id est passer en parametre + les info sur ca categorie et sur la marque (case sensitive)
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.category)
                .Include(p => p.brand)
                .Where(p => p.id == id) 
                .ToListAsync();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        
        // GET: api/AdminProduit/WithoutPromotions
        [HttpGet("WithoutPromotions")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsWithoutPromotions()
        {
            // Supposons que le produit a une relation avec la promotion via une collection ou une référence
            var productsWithoutPromotions = await _context.Products
                .Where(p => !p.Promotions.Any()) // Aucun produit ne doit avoir de promotion associée
                .ToListAsync();

            return productsWithoutPromotions;
        }

        // GET: api/AdminProduit/Categorie/5
        //recherche par categorie 
        [HttpGet("Category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int categoryId)
        {
            var products = await _context.Products
                .Include(p => p.category) 
                .Include(p => p.brand) 
                .Where(p => p.category_id == categoryId) 
                .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return products;
        }
         
        // GET: api/AdminProduit/by-name/name
        //recherche par nom 
        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByName(string name)
        {
            var products = await _context.Products
                .Include(p => p.category) // Inclut les données de la catégorie associée
                .Include(p => p.brand)    // Inclut les données de la marque associée
                .Where(p => p.name.Contains(name))               
                .ToListAsync(); // Exécute la requête de manière asynchrone

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return products;
        }
        
        // GET: api/AdminProduit/by-brand/brand
        //recherche par marque
        [HttpGet("by-brand/{brand}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByBrand(string brand)
        {
            var products = await _context.Products
                .Include(p => p.category) // Inclut les données de la catégorie associée
                .Include(p => p.brand)    // Inclut les données de la marque associée
                .Where(p =>( p.brand.name.Contains(brand)))               
                .ToListAsync(); // Exécute la requête de manière asynchrone

            if (products.Count == 0)
            {
                return NotFound();
            }

            return Ok(products);
        }

        [HttpGet("by-model/{model}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByModel(string model)
        {
            var products = await _context.Products
                .Include(p => p.category) // Inclut les données de la catégorie associée
                .Include(p => p.brand)    // Inclut les données de la marque associée
                .Where(p =>( p.model == model ))               
                .ToListAsync(); // Exécute la requête de manière asynchrone

            if (products.Count == 0)
            {
                return NotFound();
            }

            return Ok(products);
        }
        
        
        // PUT: api/AdminProduit/5/specification
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //parametrage de  de la fiche produit 
    [HttpPut("{id}/specification")]
public async Task<IActionResult> PutProduct(int id, [FromBody] JObject request)
{
    var existingProduct = await _context.Products
        .Include(p => p.category)  // Inclure la catégorie du produit
        .SingleOrDefaultAsync(p => p.id == id);

    if (existingProduct == null)
    {
        return NotFound($"Product with ID {id} not found.");
    }

    IList<string> keys = GetJsonKeys(request);
    string key = keys[0]; // Assuming only one key is being passed in the request

    var propertyInfo = existingProduct.GetType().GetProperty(key);

    if (propertyInfo != null)
    {
        var valueToParse = request[key]?.ToString();

        // Convert the value to the appropriate type
        object convertedValue = ConvertJsonTokenToType(request[key], propertyInfo.PropertyType);

        if (convertedValue != null)
        {
            propertyInfo.SetValue(existingProduct, convertedValue);
        }
        else
        {
            return BadRequest($"Invalid value for {key}. Expected type: {propertyInfo.PropertyType.Name}.");
        }
    }
    else
    {
        return BadRequest($"Property {key} not found on Product model.");
    }

    await _context.SaveChangesAsync();
    return Ok(existingProduct);
}

private object ConvertJsonTokenToType(JToken token, Type targetType)
{
    try
    {
        if (token == null || targetType == null)
        {
            return null;
        }

        // Attempt to convert based on target type
        if (targetType == typeof(string)) return token.ToString();
        if (targetType == typeof(int) || targetType == typeof(int?)) return token.ToObject<int>();
        if (targetType == typeof(decimal) || targetType == typeof(decimal?)) return token.ToObject<decimal>();
        if (targetType == typeof(double) || targetType == typeof(double?)) return token.ToObject<double>();
        if (targetType == typeof(bool) || targetType == typeof(bool?)) return token.ToObject<bool>();
        if (targetType == typeof(DateTime) || targetType == typeof(DateTime?)) return token.ToObject<DateTime>();

        // For unhandled types, try to convert or return null
        return token.ToObject(targetType);
    }
    catch (Exception ex)
    {
        // Log exception or handle as needed
        return null;
    }
}

private IList<string> GetJsonKeys(JObject jsonObject)
{
    return jsonObject.Properties().Select(p => p.Name).ToList();
}
       
        // POST: api/AdminProduit
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.id }, product);
        }

        // DELETE: api/AdminProduit/5
        [HttpDelete("{id}")]
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
        
        
        //TEST MODIF STOCK
        // PATCH: api/AdminProduit/5/stock
        [HttpPatch("{id}/stock")]
        public async Task<IActionResult> UpdateProductStock(int id, [FromBody] int newStock)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Met à jour le stock et la date de mise à jour du produit
            product.stocks = newStock;
            product.updated_at = DateTime.UtcNow;

            // Marque l'entité comme modifiée dans le contexte
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
        
    }

}


