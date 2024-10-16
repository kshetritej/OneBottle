using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Order
{
    public class UpdateOrderDTO
    {
        [Required]
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
        [Required]
        public Guid[] ProductId { get; set; } = Array.Empty<Guid>();
        [Required]
        public DateTime OrderDate { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
        [Required, DataType(DataType.Text)]
        public string ShippingAddress { get; set; } = string.Empty;
        [Required, DataType(DataType.Text)]
        public string BillingAddress { get; set; } = string.Empty;
    }
}