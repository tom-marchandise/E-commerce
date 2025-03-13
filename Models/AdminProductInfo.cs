using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Table("AdminProductInfo")]
    [Index("product_id", Name = "id")]
    public partial class AdminProductInfo
    {
        [Key]
        public int id { get; set; }
        public int quantity_arrival { get; set; }
        public int buying_price { get; set; }
        public int selling_price { get; set; }
        public int? product_id { get; set; }
        public int marge { get; set; }
        [StringLength(255)]
        public string supplier { get; set; } = null!;
        public DateOnly? date_reception { get; set; }

        [ForeignKey("product_id")]
        [InverseProperty("AdminProductInfos")]
        public virtual Product? product { get; set; }
    }
}