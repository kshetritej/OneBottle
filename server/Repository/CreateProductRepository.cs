using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace server.Repository
{
    public class CreateProductRepository : IProductRepository
    {
        private readonly AppDbContext  _context;
        public CreateProductRepository(AppDbContext context)
        {
             _context = context; 
        }
        public Task<List<Product>> GetAllProductsAsync()
        {
            return _context.Products.ToListAsync();
        }
    }
}