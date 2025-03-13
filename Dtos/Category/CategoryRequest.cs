using Microsoft.AspNetCore.Http;  // Nécessaire pour IFormFile

namespace Ecommerce.Dtos.Category 
{
    public class CategoryDto
    {
        public string Name { get; set; }
        public IFormFile Image { get; set; }
        public string form_specification_sheet { get; set; }
    }
}
