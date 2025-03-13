using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("user_id", Name = "user_id")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Address
    {
        [Key]
        public int id { get; set; }
        public int? user_id { get; set; }
        [StringLength(255)]
        public string street { get; set; } = null!;
        [StringLength(255)]
        public string city { get; set; } = null!;
        [StringLength(255)]
        public string? state { get; set; }
        [StringLength(255)]
        public string zipcode { get; set; } = null!;
        [StringLength(255)]
        public string country { get; set; } = null!;
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? updated_at { get; set; }
        [StringLength(10)]
        public string? civility { get; set; }
        [StringLength(255)]
        public string? firstname { get; set; }
        [StringLength(255)]
        public string? name { get; set; }
        [StringLength(255)]
        public string? phone_number { get; set; }

        [ForeignKey("user_id")]
        [InverseProperty("Addresses")]
        public virtual User? user { get; set; }
    }
}
