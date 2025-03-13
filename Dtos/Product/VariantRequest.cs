using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class VariantRequest
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public int IdJointProduct { get; set; }
        public string VariantType { get; set; }
        public string VariantValue { get; set; }
        public decimal? VariantPrice { get; set; }
    }
}
