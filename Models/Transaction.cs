using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("card_id", Name = "card_id")]
    [Index("order_id", Name = "order_id1")]
    [Index("user_id", Name = "user_id4")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Transaction
    {
        [Key]
        public int id { get; set; }
        public int? user_id { get; set; }
        public int? order_id { get; set; }
        [StringLength(255)]
        public string? method { get; set; }
        [StringLength(255)]
        public string? currency { get; set; }
        public int? card_id { get; set; }
        [Column(TypeName = "enum('pending','success','failed')")]
        public string? status { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? updated_at { get; set; }

        [ForeignKey("card_id")]
        [InverseProperty("Transactions")]
        public virtual Card? card { get; set; }
        [ForeignKey("order_id")]
        [InverseProperty("Transactions")]
        public virtual OrdersInfo? order { get; set; }
        [ForeignKey("user_id")]
        [InverseProperty("Transactions")]
        public virtual User? user { get; set; }
    }
}
