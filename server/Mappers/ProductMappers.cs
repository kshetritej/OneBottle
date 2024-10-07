namespace OneBottle.Mappers
{
    using OneBottle.DTOs.Product;
    using OneBottle.Models;

    public static class ProductMappers
    {
        public static ProductDTO ToProductDTO(this Product product)
        {
            return new ProductDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                ImageUrl = product.ImageUrl,
                Description = product.Description,
                Rating = product.Rating,
                Brand = product.Brand,
                Volume = product.Volume,
                ABV = product.ABV,
                CategoryId = product.CategoryId
            };
        }

        public static Product ToCreateProductDTO(this CreateProductDTO productDTO)
        {
            return new Product
            {
                Name = productDTO.Name,
                ImageUrl = productDTO.ImageUrl,
                Description = productDTO.Description,
                Brand = productDTO.Brand,
                Volume = productDTO.Volume,
                ABV = productDTO.ABV,
            };
        }
    }
}