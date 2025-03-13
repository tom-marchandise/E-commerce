using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("brand_id", Name = "brand_id")]
    [Index("category_id", Name = "category_id1")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Product
    {
        public Product()
        {
            AdminProductInfos = new HashSet<AdminProductInfo>();
            BackStocks = new HashSet<BackStock>();
            OrdersInfos = new HashSet<OrdersInfo>();
            Promotions = new HashSet<Promotion>();
            Reviews = new HashSet<Review>();
            Variantid_joint_productNavigations = new HashSet<Variant>();
            Variantid_productNavigations = new HashSet<Variant>();
        }

        [Key]
        public int id { get; set; }
        public int? brand_id { get; set; }
        public int? category_id { get; set; }
        [StringLength(255)]
        public string? name { get; set; }
        [Column(TypeName = "text")]
        public string? description { get; set; }
        [MySqlCollation("utf8mb4_bin")]
        public string? specification_sheet { get; set; }
        [MySqlCollation("utf8mb4_bin")]
        public string? image { get; set; }
        public int? stocks { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? updated_at { get; set; }
        [Precision(10, 2)]
        public decimal price { get; set; }
        public int? incrementation { get; set; }
        [StringLength(255)]
        public string? main_specs { get; set; }
        [StringLength(255)]
        public string? model { get; set; }
        public int? old_id { get; set; }
        [StringLength(255)]
        public string? varient_name { get; set; }
        [Precision(10, 2)]
        public decimal width { get; set; }
        [Precision(10, 2)]
        public decimal height { get; set; }
        [Precision(10, 2)]
        public decimal weight { get; set; }
        [Precision(10, 2)]
        public decimal length { get; set; }

        [ForeignKey("brand_id")]
        [InverseProperty("Products")]
        public virtual Brand? brand { get; set; }
        [ForeignKey("category_id")]
        [InverseProperty("Products")]
        public virtual Category? category { get; set; }
        [InverseProperty("product")]
        public virtual ICollection<AdminProductInfo> AdminProductInfos { get; set; }
        [InverseProperty("product")]
        public virtual ICollection<BackStock> BackStocks { get; set; }
        [InverseProperty("product")]
        public virtual ICollection<OrdersInfo> OrdersInfos { get; set; }
        [InverseProperty("product")]
        public virtual ICollection<Promotion> Promotions { get; set; }
        [InverseProperty("product")]
        public virtual ICollection<Review> Reviews { get; set; }
        [InverseProperty("id_joint_productNavigation")]
        public virtual ICollection<Variant> Variantid_joint_productNavigations { get; set; }
        [InverseProperty("id_productNavigation")]
        public virtual ICollection<Variant> Variantid_productNavigations { get; set; }
    }
}
