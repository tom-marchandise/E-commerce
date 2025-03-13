using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Index("user_id", Name = "user_id1")]
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class Card
    {
        public Card()
        {
            Transactions = new HashSet<Transaction>();
        }

        [Key]
        public int id { get; set; }
        public int? user_id { get; set; }
        [StringLength(16)]
        public string? card_number { get; set; }
        public DateOnly? expiration_date { get; set; }
        [StringLength(4)]
        public string? cvc { get; set; }

        [ForeignKey("user_id")]
        [InverseProperty("Cards")]
        public virtual User? user { get; set; }
        [InverseProperty("card")]
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
