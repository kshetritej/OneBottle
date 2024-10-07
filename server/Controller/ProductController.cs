using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.DTOs.Product;
using OneBottle.Mappers;
using OneBottle.Models;

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


        [HttpGet]
        [Route("{id}")]
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
        public IActionResult Create([FromBody] CreateProductDTO productDTO)
        {

            var product = productDTO.ToCreateProductDTO();
            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = product.ProductId }, product.ToProductDTO());
        }


        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateProduct([FromRoute] Guid ProductId, [FromBody] UpdateProductDTO productDto)
        {
            var productModel = _context.Products.FirstOrDefault(product => product.ProductId == ProductId);
            if (productModel == null)
            {
                return NotFound();
            }
            productModel.Name = productDto.Name;
            productModel.Description = productDto.Description;
            productModel.Brand = productDto.Brand;
            productModel.Volume = productDto.Volume;
            productModel.ABV = productDto.ABV;

            _context.SaveChanges();
            return Ok(productModel.ToProductDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteProduct([FromRoute] Guid id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }
    }
}