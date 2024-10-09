using OneBottle.DTOs.Admin;
using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface IAdminRepository
    {
        Task<Admin> GetAdminByEmailAsync(string email);
        Task<Admin> GetAdminByIdAsync(Guid adminId);
        Task CreateAdminAsync(CreateAdminDTO admin);
        Task<Admin> UpdateAdminAsync(Guid adminId, UpdateAdminDTO admin);
        Task<Admin> DeleteAdmin(Guid adminId);
    }
}