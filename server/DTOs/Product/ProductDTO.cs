namespace OneBottle.DTOs.Product
{
    public class ProductDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
    }
}