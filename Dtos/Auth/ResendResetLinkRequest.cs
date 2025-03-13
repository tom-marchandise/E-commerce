using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class ResendResetLinkRequest
    {
        [Required]
        public string Email { get; set; }
    }
}