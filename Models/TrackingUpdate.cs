using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("orderId", Name = "FK_TrackingUpdates_OrdersInfo")]
    public partial class TrackingUpdate
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime timestamp { get; set; }
        public int utcOffset { get; set; }
        [StringLength(50)]
        public string status { get; set; } = null!;
        public int orderId { get; set; }

        [ForeignKey("orderId")]
        [InverseProperty("TrackingUpdates")]
        public virtual OrdersInfo order { get; set; } = null!;
    }
}
