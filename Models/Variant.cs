using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("id_joint_product", Name = "fk_id_joint_product")]
    [Index("id_product", Name = "fk_id_product")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Variant
    {
        [Key]
        public int id { get; set; }
        public int id_product { get; set; }
        public int id_joint_product { get; set; }
        [StringLength(255)]
        public string? variant_type { get; set; }
        [StringLength(255)]
        public string? variant_value { get; set; }
        [Precision(10, 2)]
        public decimal? variant_price { get; set; }

        [ForeignKey("id_joint_product")]
        [InverseProperty("Variantid_joint_productNavigations")]
        public virtual Product id_joint_productNavigation { get; set; } = null!;
        [ForeignKey("id_product")]
        [InverseProperty("Variantid_productNavigations")]
        public virtual Product id_productNavigation { get; set; } = null!;
    }
}
