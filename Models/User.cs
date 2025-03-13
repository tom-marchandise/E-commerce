using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [MySqlCollation("utf8mb4_general_ci")]
    public partial class User
    {
        public User()
        {
            Addresses = new HashSet<Address>();
            Cards = new HashSet<Card>();
            OrdersInfos = new HashSet<OrdersInfo>();
            Reviews = new HashSet<Review>();
            Transactions = new HashSet<Transaction>();
        }

        [Key]
        public int id { get; set; }
        [StringLength(255)]
        public string email { get; set; } = null!;
        public bool? verified_email { get; set; }
        [StringLength(255)]
        public string? password { get; set; }
        [StringLength(255)]
        public string first_name { get; set; } = null!;
        [StringLength(255)]
        public string last_name { get; set; } = null!;
        [StringLength(255)]
        public string? role { get; set; }
        [StringLength(255)]
        public string? phone_number { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? created_at { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? updated_at { get; set; }
        [StringLength(6)]
        public string? otp { get; set; }
        [Column(TypeName = "timestamp")]
        public DateTime? otp_expiration { get; set; }

        [InverseProperty("user")]
        public virtual ICollection<Address> Addresses { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<Card> Cards { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<OrdersInfo> OrdersInfos { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<Review> Reviews { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
