using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Context;
using Ecommerce.Dtos.Tracking;
using Ecommerce.Models;
using Ecommerce.Services;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackingUpdateController : ControllerBase
    {
        private readonly TrackingUpdatesService _trackingUpdatesService;
        private readonly MyDbContext _context;

        public TrackingUpdateController(TrackingUpdatesService trackingUpdatesService, MyDbContext context)
        {
            _trackingUpdatesService = trackingUpdatesService;
            _context = context;
        }

        // GET: api/TrackingUpdate/{deliveryId}/{orderReference}
        [HttpGet("{deliveryId}/{orderReference}")]
        public async Task<ActionResult<IEnumerable<TrackingUpdate>>> GetTrackingUpdates(string deliveryId, string orderReference)
        {
            var orderInfo = await _context.OrdersInfos
                .Include(o => o.shipping_cost)
                .FirstOrDefaultAsync(o => o.order_reference == orderReference);

            if (orderInfo == null)
            {
                return NotFound("Order not found");
            }

            var trackingUpdates = await _context.TrackingUpdates
                .Where(t => t.orderId == orderInfo.id)
                .ToListAsync();

            if (trackingUpdates == null || trackingUpdates.Count == 0)
            {
                return NotFound();
            }

            var response = new
            {
                TrackingUpdates = trackingUpdates,
                ShippingCostDetails = new
                {
                    orderInfo.shipping_cost.country,
                    orderInfo.shipping_cost.delivery_type,
                    orderInfo.shipping_cost.price
                }
            };
            return Ok(response);
        }
        
        // GET: api/TrackingUpdate/{orderId}
        [HttpGet("{orderId}")]
        public async Task<ActionResult<IEnumerable<TrackingUpdate>>> GetTrackingUpdates(int orderId)
        {
            var trackingUpdates = await _context.TrackingUpdates
                .Where(t => t.orderId == orderId)
                .ToListAsync();

            if (trackingUpdates == null || trackingUpdates.Count == 0)
            {
                return NotFound("No tracking updates found for this order ID.");
            }

            return Ok(trackingUpdates);
        }


        // POST: api/TrackingUpdate/{orderId}
        [HttpPost("{orderId}")]
        public async Task<ActionResult> PostTrackingUpdate(int orderId)
        {
            var orderInfo = await _context.OrdersInfos
                .FirstOrDefaultAsync(o => o.id == orderId);

            if (orderInfo == null)
            {
                return NotFound("Order not found");
            }

            await _trackingUpdatesService.UpdateTrackingStatusAsync(orderId);

            return Ok("Tracking update initiated");
        }

    }
}
