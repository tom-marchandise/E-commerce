using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Models;
using Ecommerce.Context;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public PromotionsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Promotions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetPromotions()
        {
            return await _context.Promotions.Include(p => p.product).ToListAsync();
        }

        // GET: api/Promotions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Promotion>> GetPromotion(int id)
        {
            var promotion = await _context.Promotions.Include(p => p.product)
                                                     .FirstOrDefaultAsync(p => p.id == id);

            if (promotion == null)
            {
                return NotFound();
            }

            return promotion;
        }

        // POST: api/Promotions
        [HttpPost]
        public async Task<ActionResult<Promotion>> PostPromotion(Promotion promotion)
        {
            _context.Promotions.Add(promotion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPromotion), new { id = promotion.id }, promotion);
        }

        // PUT: api/Promotions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromotion(int id, Promotion promotion)
        {
            
            Console.WriteLine($"Received percentage: {promotion.percentage}");

            if (id != promotion.id)
            {
                return BadRequest();
            }

            var existingPromotion = await _context.Promotions.FindAsync(id);
            if (existingPromotion == null)
            {
                return NotFound();
            }

            // Mise à jour des champs spécifiques
            existingPromotion.product_id = promotion.product_id;
            existingPromotion.new_price = promotion.new_price;
            existingPromotion.percentage = promotion.percentage;
            existingPromotion.duration = promotion.duration;
            existingPromotion.promotion_description = promotion.promotion_description;
            existingPromotion.updated_at = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromotionExists(id))
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


        // DELETE: api/Promotions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null)
            {
                return NotFound();
            }

            _context.Promotions.Remove(promotion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PromotionExists(int id)
        {
            return _context.Promotions.Any(e => e.id == id);
        }
    }
}
