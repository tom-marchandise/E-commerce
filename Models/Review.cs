using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("product_id", Name = "product_id3")]
    [Index("user_id", Name = "user_id3")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Review
    {
        [Key]
        public int id { get; set; }
        public int? user_id { get; set; }
        public int? product_id { get; set; }
        public int? rating { get; set; }
        [Column(TypeName = "text")]
        public string? body { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }

        [ForeignKey("product_id")]
        [InverseProperty("Reviews")]
        public virtual Product? product { get; set; }
        [ForeignKey("user_id")]
        [InverseProperty("Reviews")]
        public virtual User? user { get; set; }
    }
}
