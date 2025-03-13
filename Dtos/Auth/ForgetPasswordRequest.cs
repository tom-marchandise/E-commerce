using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class ForgetPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}