using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos
{
    public class CategoryRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParentCategory { get; set; }
    }
}