using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.Helpers
{
    public class TokenHelper
    {
        private readonly IConfiguration _configuration;
        private readonly TokenBlacklistService _tokenBlacklistService;
        private readonly ConcurrentDictionary<string, (int UserId, DateTime Expiration)> _resetTokens = new ConcurrentDictionary<string, (int UserId, DateTime Expiration)>();

        // Dictionnaire pour stocker les clés publiques
        private readonly Dictionary<string, SecurityKey> _publicKeys = new Dictionary<string, SecurityKey>();

        public TokenHelper(IConfiguration configuration, TokenBlacklistService tokenBlacklistService)
        {
            _configuration = configuration;
            _tokenBlacklistService = tokenBlacklistService;

            LoadGooglePublicKeysAsync().Wait();
        }

        private async Task LoadGooglePublicKeysAsync()
        {
            using var httpClient = new HttpClient();
            var jsonResponse = await httpClient.GetStringAsync("https://www.googleapis.com/oauth2/v3/certs");
            var keys = System.Text.Json.JsonDocument.Parse(jsonResponse).RootElement.GetProperty("keys");

            foreach (var key in keys.EnumerateArray())
            {
                var kid = key.GetProperty("kid").GetString();
                var n = Base64UrlEncoder.DecodeBytes(key.GetProperty("n").GetString());
                var e = Base64UrlEncoder.DecodeBytes(key.GetProperty("e").GetString());

                var rsa = RSA.Create();
                rsa.ImportParameters(new RSAParameters { Modulus = n, Exponent = e });

                _publicKeys[kid] = new RsaSecurityKey(rsa);
            }
        }

        // Méthode pour valider un token Google OAuth2
        public async Task<GoogleJsonWebSignature.Payload> ValidateGoogleTokenAsync(string googleToken)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadToken(googleToken) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var kid = jwtToken.Header["kid"].ToString();

                if (!_publicKeys.TryGetValue(kid, out var signingKey))
                {
                    Console.WriteLine($"No public key found for kid: {kid}");
                    return null;
                }

                // Définir les paramètres de validation
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuers = new[] { "https://accounts.google.com", "accounts.google.com" },
                    ValidateAudience = true,
                    ValidAudience = _configuration["Authentication:Google:ClientId"],
                    ValidateLifetime = true,
                    IssuerSigningKey = signingKey
                };

                // Valider le token
                var principal = handler.ValidateToken(googleToken, validationParameters, out var validatedToken);
                var payload = new GoogleJsonWebSignature.Payload
                {
                    Email = principal.FindFirst(ClaimTypes.Email)?.Value,
                    GivenName = principal.FindFirst("given_name")?.Value,
                    FamilyName = principal.FindFirst("family_name")?.Value,
                };

                return payload;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Token validation error: {ex.Message}");
                return null;
            }
        }

        // Génère un token JWT pour l'authentification classique
        public string GenerateToken(int userId, string firstName, string role, string email)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", userId.ToString()),
                    new Claim(ClaimTypes.GivenName, firstName),
                    new Claim(ClaimTypes.Role, role),
                    new Claim(ClaimTypes.Email, email),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // Valide un token JWT
        public async Task<ClaimsPrincipal> ValidateTokenAsync(string token)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                if (await _tokenBlacklistService.IsTokenBlacklistedAsync(token))
                {
                    return null;
                }

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out var securityToken);
                return principal;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Génère un token de réinitialisation de mot de passe
        public string GenerateResetToken(int userId)
        {
            var token = Guid.NewGuid().ToString();
            var expiration = DateTime.Now.AddHours(1);
            _resetTokens[token] = (userId, expiration);
            return token;
        }

        // Valide un token de réinitialisation de mot de passe
        public bool ValidateResetToken(string token, out int userId)
        {
            if (_resetTokens.TryGetValue(token, out var value) && value.Expiration > DateTime.Now)
            {
                userId = value.UserId;
                return true;
            }

            userId = -1;
            return false;
        }

        // Invalide un token de réinitialisation de mot de passe
        public void InvalidateResetToken(string token)
        {
            _resetTokens.TryRemove(token, out _);
        }
    }

    public static class TokenHelperExtensions
    {
        public static void AddTokenHelper(this IServiceCollection services)
        {
            services.AddScoped<TokenHelper>();
        }
    }
}
