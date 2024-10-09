using OneBottle.Interfaces;
using OneBottle.Models;
using OneBottle.Data;
using Microsoft.EntityFrameworkCore;
namespace OneBottle.Repository
{
    public class UserRepository : IUserRepository
    {
    private readonly AppDbContext _context;
    public  UserRepository(AppDbContext context){
        _context = context;
    }
        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllUserAsync()
        {
        return await _context.Users.ToListAsync<User>();
        }

        public async Task<User> GetUserByIdAsync(Guid Id)
        {
            var user = await _context.Users.FindAsync(Id);
            return user!;
        }
    }
}
