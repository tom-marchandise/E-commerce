using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Ecommerce.Models;

namespace Ecommerce.Context
{
    public partial class MyDbContext : DbContext
    {
        public MyDbContext()
        {
        }

        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<AdminProductInfo> AdminProductInfo { get; set; } = null!;
        public virtual DbSet<BackStock> BackStocks { get; set; } = null!;
        public virtual DbSet<Brand> Brands { get; set; } = null!;
        public virtual DbSet<Card> Cards { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<OrdersInfo> OrdersInfos { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Promotion> Promotions { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<ShippingCost> ShippingCosts { get; set; } = null!;
        public virtual DbSet<TokenBlacklist> TokenBlacklists { get; set; } = null!;
        public virtual DbSet<TrackingUpdate> TrackingUpdates { get; set; } = null!;
        public virtual DbSet<Transaction> Transactions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Variant> Variants { get; set; } = null!;
        public virtual DbSet<__EFMigrationsHistory> __EFMigrationsHistories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("port=25060;host=db-mysql-nyc3-93688-do-user-17559467-0.f.db.ondigitalocean.com;database=e_commerce;user=doadmin;password=AVNS_O637_Q2EMxHnJNXBD7I", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.30-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.updated_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.user)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.user_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Addresses_ibfk_1");
            });

            modelBuilder.Entity<AdminProductInfo>(entity =>
            {
                entity.HasOne(d => d.product)
                    .WithMany(p => p.AdminProductInfos)
                    .HasForeignKey(d => d.product_id)
                    .HasConstraintName("id");
            });

            modelBuilder.Entity<BackStock>(entity =>
            {
                entity.HasOne(d => d.product)
                    .WithMany(p => p.BackStocks)
                    .HasForeignKey(d => d.product_id)
                    .HasConstraintName("BackStock_ibfk_1");
            });

            modelBuilder.Entity<Card>(entity =>
            {
                entity.HasOne(d => d.user)
                    .WithMany(p => p.Cards)
                    .HasForeignKey(d => d.user_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Cards_ibfk_1");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasOne(d => d.parent_categoryNavigation)
                    .WithMany(p => p.Inverseparent_categoryNavigation)
                    .HasForeignKey(d => d.parent_category)
                    .HasConstraintName("fk_parent_category");
            });

            modelBuilder.Entity<OrdersInfo>(entity =>
            {
                entity.Property(e => e.status).HasDefaultValueSql("'en cours'");

                entity.Property(e => e.updated_at)
                    .ValueGeneratedOnAddOrUpdate()
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.product)
                    .WithMany(p => p.OrdersInfos)
                    .HasForeignKey(d => d.product_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("OrdersInfo_ibfk_2");

                entity.HasOne(d => d.shipping_cost)
                    .WithMany(p => p.OrdersInfos)
                    .HasForeignKey(d => d.shipping_cost_id)
                    .HasConstraintName("fk_shipping_cost");

                entity.HasOne(d => d.user)
                    .WithMany(p => p.OrdersInfos)
                    .HasForeignKey(d => d.user_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("OrdersInfo_ibfk_1");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.incrementation).HasDefaultValueSql("'0'");

                entity.Property(e => e.updated_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.brand)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.brand_id)
                    .HasConstraintName("Products_ibfk_1");

                entity.HasOne(d => d.category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.category_id)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("Products_ibfk_2");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.updated_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.product)
                    .WithMany(p => p.Promotions)
                    .HasForeignKey(d => d.product_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Promotions_ibfk_1");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.product)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.product_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Reviews_ibfk_2");

                entity.HasOne(d => d.user)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.user_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Reviews_ibfk_1");
            });

            modelBuilder.Entity<TokenBlacklist>(entity =>
            {
                entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<TrackingUpdate>(entity =>
            {
                entity.HasOne(d => d.order)
                    .WithMany(p => p.TrackingUpdates)
                    .HasForeignKey(d => d.orderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TrackingUpdates_OrdersInfo");
            });

            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.updated_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.card)
                    .WithMany(p => p.Transactions)
                    .HasForeignKey(d => d.card_id)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("Transactions_ibfk_3");

                entity.HasOne(d => d.order)
                    .WithMany(p => p.Transactions)
                    .HasForeignKey(d => d.order_id)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("Transactions_ibfk_2");

                entity.HasOne(d => d.user)
                    .WithMany(p => p.Transactions)
                    .HasForeignKey(d => d.user_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Transactions_ibfk_1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.updated_at).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<Variant>(entity =>
            {
                entity.HasOne(d => d.id_joint_productNavigation)
                    .WithMany(p => p.Variantid_joint_productNavigations)
                    .HasForeignKey(d => d.id_joint_product)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_id_joint_product");

                entity.HasOne(d => d.id_productNavigation)
                    .WithMany(p => p.Variantid_productNavigations)
                    .HasForeignKey(d => d.id_product)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_id_product");
            });

            modelBuilder.Entity<__EFMigrationsHistory>(entity =>
            {
                entity.HasKey(e => e.MigrationId)
                    .HasName("PRIMARY");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}