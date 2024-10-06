namespace OneBottle.Models
{
	public class Product 
	{
		public Guid ProductId { get; set; }
		public required string Name { get; set; }
		public string Description { get; set; } = string.Empty;
		public int Rating { get; set; }
		public string Brand { get; set; } = string.Empty;
		public int Volume { get; set; }
		public decimal ABV{ get; set; }
		public required string  Category { get; set; } = string.Empty;
		public decimal Price { get; set; }
		public int StockQuantity { get; set; }
		public int AgeRestriction { get; set; }
	}
}


