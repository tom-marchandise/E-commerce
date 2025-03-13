using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Table("OrdersInfo")]
    [Index("shipping_cost_id", Name = "fk_shipping_cost")]
    [Index("product_id", Name = "product_id")]
    [Index("user_id", Name = "user_id2")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class OrdersInfo
    {
        public OrdersInfo()
        {
            TrackingUpdates = new HashSet<TrackingUpdate>();
            Transactions = new HashSet<Transaction>();
        }

        [Key]
        public int id { get; set; }
        [StringLength(50)]
        public string order_reference { get; set; } = null!;
        public int? user_id { get; set; }
        public int? product_id { get; set; }
        [StringLength(255)]
        public string delivery_address { get; set; } = null!;
        [StringLength(255)]
        public string billing_address { get; set; } = null!;
        public int quantity { get; set; }
        [Precision(10, 2)]
        public decimal taxes { get; set; }
        [Column(TypeName = "enum('en cours','expédié','livré','remboursé')")]
        public string status { get; set; } = null!;
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? updated_at { get; set; }
        public int? shipping_cost_id { get; set; }
        [Precision(10, 2)]
        public decimal? total_amount { get; set; }
        [StringLength(50)]
        public string? deliveryId { get; set; }

        [ForeignKey("product_id")]
        [InverseProperty("OrdersInfos")]
        public virtual Product? product { get; set; }
        [ForeignKey("shipping_cost_id")]
        [InverseProperty("OrdersInfos")]
        public virtual ShippingCost? shipping_cost { get; set; }
        [ForeignKey("user_id")]
        [InverseProperty("OrdersInfos")]
        public virtual User? user { get; set; }
        [InverseProperty("order")]
        public virtual ICollection<TrackingUpdate> TrackingUpdates { get; set; }
        [InverseProperty("order")]
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
