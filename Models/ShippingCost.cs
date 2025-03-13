using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Models
{
    [Table("ShippingCost")]
    public partial class ShippingCost
    {
        public ShippingCost()
        {
            OrdersInfos = new HashSet<OrdersInfo>();
        }

        [Key]
        public int id { get; set; }
        [StringLength(255)]
        public string country { get; set; } = null!;
        [StringLength(255)]
        public string delivery_type { get; set; } = null!;
        public int price { get; set; }

        [InverseProperty("shipping_cost")]
        public virtual ICollection<OrdersInfo> OrdersInfos { get; set; }
    }
}
