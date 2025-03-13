using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Table("__EFMigrationsHistory")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class __EFMigrationsHistory
    {
        [Key]
        [StringLength(150)]
        public string MigrationId { get; set; } = null!;
        [StringLength(32)]
        public string ProductVersion { get; set; } = null!;
    }
}
