using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class RegisterRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [StringLength(255)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(255)]
        public string LastName { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }
    }
}