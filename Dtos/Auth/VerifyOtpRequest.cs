using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class VerifyOtpRequest
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Otp { get; set; }
    }
}