namespace OneBottle.Models
{
    public class UserProfile
    {
        public Guid ProfileId { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; } 
        public int IdentificationNumber { get; set; } 
        public string IdentificationType { get; set; } = string.Empty;
    }
}