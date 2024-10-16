using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> GetCartByIdAsync(Guid cartId)
        {
            return await _context.Carts.FindAsync(cartId);
        }

        public async Task<IEnumerable<Cart>> GetCartsByUserIdAsync(Guid userId)
        {
            return await _context.Carts.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task AddCartItemAsync(Cart cartItem)
        {
            try
            {
                await _context.Carts.AddAsync(cartItem);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while adding the cart item.", ex);
            }
        }

        public async Task UpdateCartItemAsync(Cart cartItem)
        {
            try
            {
                _context.Carts.Update(cartItem);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while updating the cart item.", ex);
            }
       }

       public async Task DeleteCartItemAsync(Guid cartId)
       {
           var cartItem = await GetCartByIdAsync(cartId);
           if (cartItem != null)
           {
               try
               {
                   _context.Carts.Remove(cartItem);
                   await _context.SaveChangesAsync();
               }
               catch (Exception ex)
               {
                   // Log exception here
                   throw new Exception("An error occurred while deleting the cart item.", ex);
               }
           }
       }
   }
}