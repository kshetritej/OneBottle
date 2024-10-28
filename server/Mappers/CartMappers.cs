namespace OneBottle.DTOs.Cart
{
    using OneBottle.Models;
    using OneBottle.DTOs.Product;

    public static class CartMapper
    {
        public static Cart ToCartModel(this CreateCartDto cart)
        {
            return new Cart
            {
                CartId = Guid.NewGuid(), // Use Guid.NewGuid() for new CartId
                ProductId = cart.ProductId,
                UserId = cart.UserId,
                Quantity = cart.Quantity,
            };
        }

        public static CartDto ToCartDTO(Cart cart)
        {
            return new CartDto
            {
                CartId = cart.CartId,
                UserId = cart.UserId,
                ProductId = cart.ProductId,
                Product = new ProductDTO() // Change to ProductDTO
                {
                    ProductId = cart.Product.ProductId,
                    Name = cart.Product.Name,
                    Price = cart.Product.Price,
                    ImageUrl = cart.Product.ImageUrl,
                    Description = cart.Product.Description,
                    Rating = cart.Product.Rating,
                    Brand = cart.Product.Brand,
                    Volume = cart.Product.Volume,
                    ABV = cart.Product.ABV,
                    CategoryId = cart.Product.Category?.CategoryId // Handle null category if necessary
                },
                Quantity = cart.Quantity,
            };
        }
    }
}