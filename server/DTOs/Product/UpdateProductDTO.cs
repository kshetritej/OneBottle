
using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Product
{
    public class UpdateProductDTO
    {
        public required string Name { get; set; }
        [Url]
        public string ImageUrl { get; set; } = string.Empty;
        [MaxLength(250), MinLength(10, ErrorMessage = "Description must be between 10 and 250 characters")]
        public string Description { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public int Volume { get; set; }
        public decimal ABV { get; set; }
    }
}