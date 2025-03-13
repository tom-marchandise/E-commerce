using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class BlacklistTokenRequest
    {
        public string Token { get; set; }
    }
}