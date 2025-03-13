using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dtos.Tracking
{
    public class TrackingUpdateRequest
    {
        [Required]
        public string Status { get; set; }

        public int UtcOffset { get; set; }
    }
}