namespace OneBottle.DTOs.Admin
{
    public class CreateAdminDTO
    {
        public Guid AdminId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}