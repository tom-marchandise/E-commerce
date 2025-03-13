using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class ProductRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; } 

        public decimal Price { get; set; }
        public int Stocks { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Incrementation { get; set; }
        public string MainSpecs { get; set; }
        public string Model { get; set; }
        public CategoryRequest Category { get; set; }
        public List<VariantRequest> VariantidProductNavigations { get; set; }
        public List<VariantRequest> VariantidJointProductNavigations { get; set; }
    }
}