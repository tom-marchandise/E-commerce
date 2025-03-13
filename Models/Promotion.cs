using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("product_id", Name = "product_id2")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Promotion
    {
        [Key]
        public int id { get; set; }
        public int? product_id { get; set; }
        [Precision(10, 2)]
        public decimal? new_price { get; set; }
        [Precision(5, 2)]
        public decimal? percentage { get; set; }
        public DateOnly? duration { get; set; }
        [Column(TypeName = "text")]
        public string? promotion_description { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? updated_at { get; set; }

        [ForeignKey("product_id")]
        [InverseProperty("Promotions")]
        public virtual Product? product { get; set; }
    }
}
