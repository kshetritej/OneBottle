using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.DTOs.Product;
using OneBottle.Mappers;

namespace OneBottle.Controller
{
    [Route("api/product")]
    [ApiController]

    public class ProductController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _context.Products.ToList().Select(products => products.ToProductDTO());
            // var products = _context.Products.ToList();
            return Ok(products);
        }


        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpPost]
        public IActionResult Create([FromBody] CreateProductDTO productDTO){

            var product = productDTO.ToCreateProductDTO();
            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = product.ProductId }, product.ToProductDTO());
        }
    }
}