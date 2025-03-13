using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using DotNetEnv;
using Ecommerce.Models;

namespace Ecommerce.DB
{
    public class MySqldbContext : DbContext
    {
        public DbSet<User> User { get; set; }

        public MySqldbContext(DbContextOptions<MySqldbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
            // charger variables d'environnements
            Env.Load();

            var user = Environment.GetEnvironmentVariable("DB_USER");
            var password = Environment.GetEnvironmentVariable("DB_PASSWORD");
            
            // construire la chaîne de caractères pour la connexion à la DB
            var connectionString = $"server=localhost;database=ecommerce_db;user={user};password={password}";

            optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 21)));
        }
    }
}