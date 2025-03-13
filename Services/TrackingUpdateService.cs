using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ecommerce.Context;
using Ecommerce.Models;
using Microsoft.Extensions.DependencyInjection;

namespace Ecommerce.Services
{
    public class TrackingUpdatesService
    {
        private readonly MyDbContext _context;

        public TrackingUpdatesService(MyDbContext context)
        {
            _context = context;
        }

        public async Task UpdateTrackingStatusAsync(int orderId, string status, int utcOffset)
        {
            var trackingUpdate = new TrackingUpdate
            {
                status = status,
                utcOffset = utcOffset,
                timestamp = DateTime.UtcNow,
                orderId = orderId
            };

            _context.TrackingUpdates.Add(trackingUpdate);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTrackingStatusAsync(int orderId)
        {
            var trackingSteps = new List<TrackingUpdate>
            {
                new TrackingUpdate { status = "Le colis est en train d’être préparé", utcOffset = 120, orderId = orderId },
                new TrackingUpdate { status = "Le colis part de l’entrepôt", utcOffset = 120, orderId = orderId },
                new TrackingUpdate { status = "Le colis est en transit", utcOffset = 120, orderId = orderId },
                new TrackingUpdate { status = "Le colis est au centre de tri", utcOffset = 120, orderId = orderId },
            };

            DateTime baseTimestamp = DateTime.UtcNow;

            foreach (var step in trackingSteps)
            {
                step.timestamp = baseTimestamp.AddDays(trackingSteps.IndexOf(step));

                await Task.Delay(TimeSpan.FromSeconds(5));

                _context.TrackingUpdates.Add(step);
                await _context.SaveChangesAsync();
            }
        }
    }

    public static class TrackingUpdatesServiceExtensions
    {
        public static void AddTrackingUpdatesService(this IServiceCollection services)
        {
            services.AddScoped<TrackingUpdatesService>();
        }
    }
}
