using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Ecommerce.Context;
using Ecommerce.Models;
using Ecommerce.Dtos;
using Ecommerce.Mailer;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BackStockController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly ILogger<BackStockController> _logger;
        private readonly MyDbContext _context;

        public BackStockController(EmailService emailService, ILogger<BackStockController> logger, MyDbContext context)
        {
            _emailService = emailService;
            _logger = logger;
            _context = context; 
        }

        // POST: api/BackStock
        [HttpPost]
        public async Task<IActionResult> NotifyBackInStock([FromBody] BackStockRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || request.ProductId <= 0)
            {
                return BadRequest("Adresse e-mail ou ID produit invalide.");
            }

            try
            {
                var backStockEntry = new BackStock
                {
                    email = request.Email,
                    product_id = request.ProductId
                };

                _context.BackStocks.Add(backStockEntry);
                await _context.SaveChangesAsync();

                var product = await _context.Products
                    .Where(p => p.id == request.ProductId)
                    .Select(p => new { p.name })
                    .FirstOrDefaultAsync();

                if (product == null)
                {
                    return NotFound("Produit non trouvé.");
                }

                await _emailService.SendBackInStockEmailAsync(request.Email, product.name);
        
                return Ok("Vous serez maintenant notifié lorsque l'article sera de nouveau en stock.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de l'envoi de l'email ou de l'enregistrement en base de données.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Une erreur s'est produite lors de l'envoi de l'email ou de l'enregistrement.");
            }
        }

    }
}
