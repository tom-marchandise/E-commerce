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
    public class ShippingCostController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ShippingCostController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/ShippingCost
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingCost>>> GetShippingCosts()
        {
            return await _context.ShippingCosts.ToListAsync();
        }

        // GET: api/ShippingCost/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShippingCost>> GetShippingCost(int id)
        {
            var shippingCost = await _context.ShippingCosts.FindAsync(id);

            if (shippingCost == null)
            {
                return NotFound();
            }

            return shippingCost;
        }
        
        // GET: api/ShippingCost/Country/{country}
        [HttpGet("Country/{country}")]
        public async Task<ActionResult<ShippingCost>> GetShippingCostByCountry(string country)
        {
            var shippingCost = await _context.ShippingCosts
                .Where(s => s.country == country)
                .ToListAsync();

            if (shippingCost == null)
            {
                return NotFound();
            }

            return Ok(shippingCost);
        }

        // POST: api/ShippingCost
        [HttpPost]
        public async Task<ActionResult<ShippingCost>> PostShippingCost(ShippingCost shippingCost)
        {
            _context.ShippingCosts.Add(shippingCost);
            await _context.SaveChangesAsync();

            
            return Ok("livraison OK");
        }

        // PUT: api/ShippingCost/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShippingCost(int id, ShippingCost shippingCost)
        {
            if (id != shippingCost.id)
            {
                return BadRequest();
            }

            _context.Entry(shippingCost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingCostExists(id))
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

        // DELETE: api/ShippingCost/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShippingCost(int id)
        {
            var shippingCost = await _context.ShippingCosts.FindAsync(id);
            if (shippingCost == null)
            {
                return NotFound();
            }

            _context.ShippingCosts.Remove(shippingCost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShippingCostExists(int id)
        {
            return _context.ShippingCosts.Any(e => e.id == id);
        }
    }
}
