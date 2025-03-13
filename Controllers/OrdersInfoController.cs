using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Models;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using Ecommerce.Mailer;
using System.IO;
using System.Net.Http;
using System.Net.Http.Json;
using Stripe.Climate;


namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersInfoController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly MyDbContext _context;

        public OrdersInfoController(MyDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // GET: api/OrdersInfo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdersInfo>>> GetOrdersInfo()
        {
            return await _context.OrdersInfos
                .Include(o => o.product)
                .ToListAsync();
        }

        // GET: api/OrdersInfo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdersInfo>> GetOrdersInfo(int id)
        {
            var orderInfo = await _context.OrdersInfos
                .Include(o => o.product)
                .FirstOrDefaultAsync(o => o.id == id);

            if (orderInfo == null)
            {
                return NotFound();
            }

            return orderInfo;
        }
        
        // GET: api/OrdersInfo/ByEmail/{email}
        [HttpGet("ByEmail/{email}")]
        public async Task<ActionResult<IEnumerable<OrdersInfo>>> GetOrdersInfoByEmail(string email)
        {
            var ordersInfo = await _context.OrdersInfos
                .Include(o => o.product)
                .Where(o => o.user.email == email)
                .ToListAsync();

            if (ordersInfo == null || !ordersInfo.Any())
            {
                return NotFound(new { message = "No orders found for this email." });
            }

            return Ok(ordersInfo);
        }
        
        // GET: api/OrdersInfo/Reference/A1B2C3D
        [HttpGet("Reference/{reference}")]
        public async Task<ActionResult<IEnumerable<OrdersInfo>>> GetOrdersInfoByReference(string reference)
        {
            var orderInfo = await _context.OrdersInfos
                .Where(o => o.order_reference == reference)
                .Include(o => o.product)
                .ToListAsync();

            if (orderInfo == null || !orderInfo.Any())
            {
                return NotFound();
            }

            return Ok(orderInfo);
        }

        
        // GET: api/package/{deliveryId}
        [HttpGet("package/{deliveryId}")]
        public async Task<IActionResult> GetPackageTrackingInfo(string deliveryId)
        {
            string apiUrl = $"https://epicareer.epidoc.eu/api/package/{deliveryId}";

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                var response = await httpClient.GetAsync(apiUrl);
                if (!response.IsSuccessStatusCode)
                {
                    return NotFound(new { success = false, message = "Suivi non trouvé." });
                }

                var trackingInfo = await response.Content.ReadFromJsonAsync<TrackingResponse>();

                return Ok(new { success = true, data = trackingInfo });
            }
        }


        // GET: api/OrdersInfo/Invoice/{orderReference}
        [HttpGet("Invoice/{orderReference}")]
        public async Task<IActionResult> DownloadInvoice(string orderReference)
        {
            var orderInfo = await _context.OrdersInfos
                .Include(o => o.product) // Si c'est un seul produit
                .FirstOrDefaultAsync(o => o.order_reference == orderReference);

            if (orderInfo == null)
            {
                return NotFound();
            }

            using (var memoryStream = new MemoryStream())
            {
                var writer = new PdfWriter(memoryStream);
                var pdf = new PdfDocument(writer);
                var document = new Document(pdf);

                document.Add(new Paragraph("Facture pour " + orderInfo.order_reference));
                document.Add(new Paragraph("Montant total: " + orderInfo.total_amount + " €"));
                document.Add(new Paragraph("Statut: " + orderInfo.status));
                document.Add(new Paragraph("Adresse de livraison: " + orderInfo.delivery_address));
                document.Add(new Paragraph("Adresse de facturation: " + orderInfo.billing_address));
                document.Add(new Paragraph("Produit:"));

                document.Add(new Paragraph($"- {orderInfo.product.name}: {orderInfo.product.price} €"));

                document.Close();

                var fileBytes = memoryStream.ToArray();
                return File(fileBytes, "application/pdf", $"facture_{orderReference}.pdf");
            }
        }
        
        // POST: api/OrdersInfo/sendEmail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("sendEmail")]
        public async Task<IActionResult> SendConfirmationEmail([FromBody] EmailRequest request)
        {
            await _emailService.SendOrderConfirmedEmail(request.toEmail, request.orderReference);

            return Ok("Mail envoyé");
        }
        
        // POST: api/OrdersInfo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrdersInfo>> PostOrdersInfo(OrdersInfo ordersInfo)
        {
            _context.OrdersInfos.Add(ordersInfo);
            var productId = ordersInfo.product_id;
            
            var product = await _context.Products.FirstOrDefaultAsync(p => p.id == productId);
            if (product != null)
            {
                var stock = product.stocks;
                product.stocks = stock - ordersInfo.quantity;
            }


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrdersInfo", new { id = ordersInfo.id }, ordersInfo);
        }
        }
    
}
    
    public class TrackingResponse
    {
        public bool Success { get; set; }
        public PackageData Data { get; set; }
    }

    public class PackageData
    {
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public List<PackageItem> Package { get; set; }
        public PriceInfo Price { get; set; }
        public string EstimatedTravelTime { get; set; }
        public List<LogInfo> Logs { get; set; }
        public string TrackingLink { get; set; }
    }

    public class PackageItem
    {
        public string Content { get; set; }
        public double Weight { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double Length { get; set; }
    }

    public class PriceInfo
    {
        public double Transport { get; set; }
        public double Port { get; set; }
        public double Service { get; set; }
        public double Total { get; set; }
        public string Currency { get; set; }
    }

    public class LogInfo
    {
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Carrier { get; set; }
        public string Message { get; set; }
    }

    public class EmailRequest
    {
        public string toEmail { get; set; }
        public string orderReference { get; set; }
    }