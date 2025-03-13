using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class GoogleAuthRequest
    {
        [Required(ErrorMessage = "TokenId is required.")]
        public string TokenId { get; set; }
        
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}