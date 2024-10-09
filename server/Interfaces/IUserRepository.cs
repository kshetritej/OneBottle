using OneBottle.Models;

namespace OneBottle.Interfaces {
    public interface IUserRepository{
        Task<List<User>>GetAllUserAsync();
        Task<User>GetUserByIdAsync(Guid Id);
        Task<User> GetUserByEmailAsync(string Email);
        Task AddUserAsync(User user);
    }
}
