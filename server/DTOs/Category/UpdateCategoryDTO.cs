using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Category
{
    public class UpdateCategoryDTO
    {
        [Required]
        public Guid CategoryId { get; set; }

        [ MaxLength(50, ErrorMessage = "Name must be less than 50 characters")]
        public string Name { get; set; } = string.Empty;
        [ MaxLength(150, ErrorMessage = "Description must be less than 150 characters")]
        public string Description { get; set; } = string.Empty;

    }
}