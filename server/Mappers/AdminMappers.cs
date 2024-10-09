using OneBottle.DTOs;
using OneBottle.Models;

namespace OneBottle.Mappers
{
    public static class AdminMappers
    {
        public static AdminDTO ToAdminDTO(this Admin admin)
        {
            return new AdminDTO
            {
                AdminId = admin.AdminId,
                Username = admin.Username
            };
        }
    }
}