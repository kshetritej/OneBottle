using OneBottle.Models;

namespace OneBottle.Interfaces {
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProductsAsync();
    }
}