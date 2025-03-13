using System;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Context;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Models;
using Microsoft.Extensions.DependencyInjection;

namespace Ecommerce.Helpers
{
    public class TokenBlacklistService
    {
        private readonly MyDbContext _context;

        public TokenBlacklistService(MyDbContext context)
        {
            _context = context;
        }

        public async Task BlacklistTokenAsync(string token, DateTime expiration)
        {
            var blacklistedToken = new TokenBlacklist
            {
                token = token,
                expiration = expiration,
                created_at = DateTime.UtcNow
            };

            _context.TokenBlacklists.Add(blacklistedToken);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsTokenBlacklistedAsync(string token)
        {
            var blacklistedToken = await _context.TokenBlacklists
                .Where(t => t.token == token && t.expiration > DateTime.UtcNow)
                .FirstOrDefaultAsync();

            return blacklistedToken != null;
        }

        public async Task CleanupExpiredTokensAsync()
        {
            var now = DateTime.UtcNow;
            var expiredTokens = await _context.TokenBlacklists
                .Where(t => t.expiration <= now)
                .ToListAsync();

            _context.TokenBlacklists.RemoveRange(expiredTokens);
            await _context.SaveChangesAsync();
        }
    }

    public static class TokenBlacklistServiceExtensions
    {
        public static IServiceCollection AddTokenBlacklistService(this IServiceCollection services)
        {
            services.AddScoped<TokenBlacklistService>();
            return services;
        }
    }
}