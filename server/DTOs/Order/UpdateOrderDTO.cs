using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Order
{
    public class UpdateOrderDTO
    {
        [Required]
        public Guid OrderId { get; set; }
        [Required]
        public string OrderStatus { get; set; } = string.Empty;
    }
}