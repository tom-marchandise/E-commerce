using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [StringLength(255, MinimumLength = 6)]
        public string Password { get; set; }
    }
}