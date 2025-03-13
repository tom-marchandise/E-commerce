using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("parent_category", Name = "fk_parent_category")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Category
    {
        public Category()
        {
            Inverseparent_categoryNavigation = new HashSet<Category>();
            Products = new HashSet<Product>();
        }

        [Key]
        public int id { get; set; }
        [StringLength(255)]
        public string? name { get; set; }
        [MySqlCollation("utf8mb4_bin")]
        public string? form_specification_sheet { get; set; }
        public int? parent_category { get; set; }
        [MySqlCollation("utf8mb4_bin")]
        public string? filters { get; set; }
        public string? image { get; set; }

        [ForeignKey("parent_category")]
        [InverseProperty("Inverseparent_categoryNavigation")]
        public virtual Category? parent_categoryNavigation { get; set; }
        [InverseProperty("parent_categoryNavigation")]
        public virtual ICollection<Category> Inverseparent_categoryNavigation { get; set; }
        [InverseProperty("category")]
        public virtual ICollection<Product> Products { get; set; }
    }
}
