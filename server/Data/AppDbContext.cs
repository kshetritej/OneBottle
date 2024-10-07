using Microsoft.EntityFrameworkCore;
using OneBottle.Models;
using server.Models;

namespace OneBottle.Data{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options) {
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users{ get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }
    } }