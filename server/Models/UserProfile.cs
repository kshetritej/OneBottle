using System.ComponentModel.DataAnnotations;

namespace OneBottle.Models
{
    public class UserProfile
    {
        [Key]
        public Guid ProfileId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public int IdentificationNumber { get; set; }
        public string IdentificationType { get; set; } = string.Empty;
    }
}