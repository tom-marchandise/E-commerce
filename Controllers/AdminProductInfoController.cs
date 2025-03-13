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
    public class AdminProductInfoController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminProductInfoController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/AdminProductInfo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminProductInfo>>> GetAdminProductInfo()
        {
            return await _context.AdminProductInfo.Include(a => a.product).ToListAsync();
        }

        // GET: api/AdminProductInfo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminProductInfo>> GetAdminProductInfo(int id)
        {
            var adminProductInfo = await _context.AdminProductInfo.Include(a => a.product)
                                                                  .FirstOrDefaultAsync(a => a.id == id);

            if (adminProductInfo == null)
            {
                return NotFound();
            }

            return adminProductInfo;
        }

        // POST: api/AdminProductInfo
        [HttpPost]
        public async Task<ActionResult<AdminProductInfo>> PostAdminProductInfo(AdminProductInfo adminProductInfo)
        {
            _context.AdminProductInfo.Add(adminProductInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdminProductInfo), new { id = adminProductInfo.id }, adminProductInfo);
        }

        // PUT: api/AdminProductInfo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminProductInfo(int id, AdminProductInfo adminProductInfo)
        {
            if (id != adminProductInfo.id)
            {
                return BadRequest();
            }

            var existingAdminProductInfo = await _context.AdminProductInfo.FindAsync(id);
            if (existingAdminProductInfo == null)
            {
                return NotFound();
            }
            
            existingAdminProductInfo.quantity_arrival = adminProductInfo.quantity_arrival;
            existingAdminProductInfo.buying_price = adminProductInfo.buying_price;
            existingAdminProductInfo.selling_price = adminProductInfo.selling_price;
            existingAdminProductInfo.product_id = adminProductInfo.product_id;
            existingAdminProductInfo.marge = adminProductInfo.marge;
            existingAdminProductInfo.supplier = adminProductInfo.supplier;
            existingAdminProductInfo.date_reception = adminProductInfo.date_reception;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminProductInfoExists(id))
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

        // DELETE: api/AdminProductInfo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminProductInfo(int id)
        {
            var adminProductInfo = await _context.AdminProductInfo.FindAsync(id);
            if (adminProductInfo == null)
            {
                return NotFound();
            }

            _context.AdminProductInfo.Remove(adminProductInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminProductInfoExists(int id)
        {
            return _context.AdminProductInfo.Any(e => e.id == id);
        }
    }
}
