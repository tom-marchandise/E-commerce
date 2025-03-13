using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class BackStockRequest
    {
        [Required(ErrorMessage = "L'adresse e-mail est requise.")]
        [EmailAddress(ErrorMessage = "L'adresse e-mail n'est pas valide.")]
        public string Email { get; set; }
        
        public int ProductId { get; set; }

    }
}