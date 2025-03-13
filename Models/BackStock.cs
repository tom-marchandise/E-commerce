using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Table("BackStock")]
    [Index("product_id", Name = "product_id")]
    public partial class BackStock
    {
        [Key]
        public int id { get; set; }
        [StringLength(255)]
        public string email { get; set; } = null!;
        public int product_id { get; set; }

        [ForeignKey("product_id")]
        [InverseProperty("BackStocks")]
        public virtual Product product { get; set; } = null!;
    }
}
