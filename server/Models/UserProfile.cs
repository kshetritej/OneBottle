namespace server.Models
{
    public class UserProfile
    {
        public Guid ProfileId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; } 
        public int IdentificationNumber { get; set; } 
        public string gIdentificationType { get; set; } = string.Empty;
    }
}