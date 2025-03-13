using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class ResetPasswordRequest
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 6)]
        public string NewPassword { get; set; }
    }
}