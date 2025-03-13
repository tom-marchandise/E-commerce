using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.Configuration.Attributes;
using Ecommerce.Context;
using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class DownloadCsvController : ControllerBase
    {
        private readonly MyDbContext _context;

        public DownloadCsvController(MyDbContext context)
        {
            _context = context;
        }
        
        public class UsersValues
        {
            [Name("firstname")]
            public string firstname { get; set; }
            
            [Name("lastname")]
            public string lastname { get; set; }
            
            [Name("role")]
            public string role { get; set; }
            
            [Name("phone")]
            public string phone { get; set; }
            
            [Name("id")]
            public int id { get; set; }
            
            [Name("email")] 
            public string email { get; set; }
            
            [Name("Id_Orders")]
            public int id_orders { get; set; }

            [Name("order_reference")]
            public string order_reference { get; set; }
            
            [Name("Quantity")]
            public int quantity { get; set; } 
            
            [Name("Product_name")]
            public string product_name { get; set; }
            
            
            [Name("Category_name")]
            public string category_name { get; set; }
            
            [Name("Status")]
            public string status { get; set; }
        }
        
        
        [HttpPost("GetUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces("text/csv")]
        public async Task<FileResult> GetUsers()
        {
            
            var usersWithOrders = await (from user in _context.Users
                join order in _context.OrdersInfos on user.id equals order.user_id into userOrders
                from order in userOrders.DefaultIfEmpty()
                join product in _context.Products on order.product_id equals product.id into orderProducts
                from product in orderProducts.DefaultIfEmpty()
                join category in _context.Categories on product.category_id equals category.id into productCategories
                from category in productCategories.DefaultIfEmpty()
                select new UsersValues
                {
                    id = user.id,
                    firstname = user.first_name,
                    lastname = user.last_name,
                    email = user.email,
                    role = user.role,
                    phone = user.phone_number,
                    id_orders= order != null ? order.id : 0,
                    order_reference = order != null ? order.order_reference : string.Empty,
                    quantity = order != null ? order.quantity : 0,
                    status = order != null ? order.status : string.Empty,
                    product_name = product != null ? product.name : string.Empty,
                    category_name = category != null ? category.name : string.Empty
                }).ToListAsync();
            
            
            using (var memoryStream = new MemoryStream())
            {
                using (var streamWriter = new StreamWriter(memoryStream))
                {
                    using (var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
                    {
                        csvWriter.WriteRecords(usersWithOrders);
                        
                        csvWriter.Flush();
                    }
                } 
                
                return File(memoryStream.ToArray(), "text/csv", $"Export.csv");
                
            }
        }
        
        
        public class StockValues
        {
            [Name("id")]
            public int id { get; set; }
            
            [Name("name_product")]
            public string name_product { get; set; }
            
            [Name("category_name")]
            public string category_name { get; set; }
            
            [Name("stock")]
            public int? stock { get; set; }
            
            [Name("buying_price")]
            public int buying_price { get; set; }
            
            [Name("selling_price")]
            public int selling_price { get; set; }
            
            [Name("supplier")]
            public string supplier { get; set; }
            
            [Name("selling_number")]
            public int selling_number { get; set; }
            
        }


        [HttpPost("GetStats")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces("text/csv")]
        public async Task<FileResult> GetStats()
        {

            var stockVal = await (from products in _context.Products
                join AdminProductInfo in _context.AdminProductInfo on products.id equals AdminProductInfo
                    .product_id into productInfo
                from AdminProductInfo in productInfo.DefaultIfEmpty()
                join category in _context.Categories on products.category_id equals category.id into categoryInfo
                from category in categoryInfo.DefaultIfEmpty()
                    select new 
                    {
                        id = products.id,
                        name_product = products.name,
                        category_name = category.name,
                        stock = products != null ? products.stocks : 0,
                        buying_price = AdminProductInfo != null ? AdminProductInfo.buying_price : 0,
                        selling_price = AdminProductInfo != null ? AdminProductInfo.selling_price : 0,
                        supplier = AdminProductInfo != null ? AdminProductInfo.supplier : string.Empty,
                    }).ToListAsync();
            
            var orderCounts = await _context.OrdersInfos
                .GroupBy(o => o.product_id)
                .Select(g => new { product_id = g.Key, count = g.Count() })
                .ToDictionaryAsync(x => x.product_id, x => x.count);

            
            var stockValues = stockVal
                .Select(p => new StockValues
                {
                    id = p.id,
                    name_product = p.name_product,
                    category_name = p.category_name,
                    stock = p.stock,
                    buying_price = p.buying_price,
                    selling_price = p.selling_price,
                    supplier = p.supplier,
                    selling_number = orderCounts.TryGetValue(p.id, out var count) ? count : 0
                })
                .OrderByDescending(p => p.selling_number)
                .ToList();
            
       

            
            using (var memoryStream = new MemoryStream())
            {
                using (var streamWriter = new StreamWriter(memoryStream))
                {
                    using (var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
                    {
                        csvWriter.WriteRecords(stockValues);

                        csvWriter.Flush();
                    }
                }

                return File(memoryStream.ToArray(), "text/csv", $"Export.csv");

            }
        }
        
    }
}
