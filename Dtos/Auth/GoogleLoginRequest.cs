using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos.Auth
{
    public class GoogleLoginRequest
    {
        [Required(ErrorMessage = "Le token d'identification est requis.")]
        public string IdToken { get; set; }
    }
}