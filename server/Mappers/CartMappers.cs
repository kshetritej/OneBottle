using OneBottle.DTOs;
using OneBottle.DTOs.Cart;
using OneBottle.DTOs.Category;
using OneBottle.Models;

namespace OneBottle.Mappers
{
    public static class CartMapper
    {
        public static Cart ToCartModel(this CartDto cart)
        {
            return new Cart
            {
                CartId = new Guid(),
                ProductId = cart.ProductId,
                UserId = cart.UserId,
                Quantity = cart.Quantity,
            };
        }

        public static Cart ToCartDTO(Cart cartDto)
        {
            return new Cart
            {
                ProductId = cartDto.ProductId,
                UserId = cartDto.UserId,
            };
        }

    }
}