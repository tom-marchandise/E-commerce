using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Brand
    {
        public Brand()
        {
            Products = new HashSet<Product>();
        }

        [Key]
        public int id { get; set; }
        [StringLength(255)]
        [MySqlCollation("utf8mb4_bin")]
        public string? name { get; set; }

        [InverseProperty("brand")]
        public virtual ICollection<Product> Products { get; set; }
    }
}
