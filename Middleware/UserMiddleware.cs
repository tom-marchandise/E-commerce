using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

public class RoleBasedRedirectMiddleware
{
    private readonly RequestDelegate _next;
    private readonly TokenValidationParameters _tokenValidationParameters;
    private readonly string[] _restrictedRoutes = { "/admin/products" };

    public RoleBasedRedirectMiddleware(RequestDelegate next, IOptions<TokenValidationParameters> tokenValidationParameters)
    {
        _next = next;
        _tokenValidationParameters = tokenValidationParameters.Value;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var requestPath = context.Request.Path.Value.ToLower();

        if (_restrictedRoutes.Contains(requestPath))
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!string.IsNullOrEmpty(token))
            {
                try
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var principal = ValidateToken(token);

                    if (principal != null)
                    {
                        var userRole = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

                        if (userRole == "customers")
                        {
                            context.Response.Redirect("/");
                            return;
                        }
                    }
                }
                catch (SecurityTokenException)
                {
                    // Token is invalid or expired
                    context.Response.Redirect("/");
                    return;
                }
                catch (Exception)
                {
                    // Handle other exceptions (if necessary)
                    context.Response.Redirect("/");
                    return;
                }
            }
            else
            {
                context.Response.Redirect("/");
                return;
            }
        }

        await _next(context);
    }

    private ClaimsPrincipal ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var securityToken);
            return principal;
        }
        catch (Exception)
        {
            return null;
        }
    }
}
