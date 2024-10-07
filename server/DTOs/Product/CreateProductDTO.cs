namespace OneBottle.DTOs.Product
{
    public class CreateProductDTO
    {
        public required string Name { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public int Volume { get; set; }
        public decimal ABV { get; set; }
        public Guid CategoryId { get; set; }
    }
}