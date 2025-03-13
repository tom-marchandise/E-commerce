using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Table("TokenBlacklist")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class TokenBlacklist
    {
        [Key]
        public int id { get; set; }
        [StringLength(2048)]
        public string token { get; set; } = null!;
        [Column(TypeName = "timestamp")]
        public DateTime expiration { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }
    }
}
