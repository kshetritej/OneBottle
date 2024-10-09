using OneBottle.Models;

namespace OneBottle.Interfaces {
    public interface IUserRepository{
        Task<List<User>>GetAllUserAsync();
        Task<User>GetUserByIdAsync(Guid Id);
        Task AddUserAsync(User user);
        Task VerifyUser(User user);
    }
}
