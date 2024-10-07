using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.DTOs.Product;
using OneBottle.Interfaces;
using OneBottle.Mappers;

namespace OneBottle.Controller
{
    [Route("api/product")]
    [ApiController]

    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IProductRepository _productRepo;
        public ProductController(AppDbContext context, IProductRepository productRepo)
        {
            _context = context;
            _productRepo = productRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProductsAsync()
        {
            var products = await _productRepo.GetAllProductsAsync();
            var productsReturnedFromDb = products.Select(products => products.ToProductDTO());
            return Ok(products);
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductDTO productDTO)
        {

            var product = productDTO.ToCreateProductDTO();
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = product.ProductId }, product.ToProductDTO());
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid ProductId, [FromBody] UpdateProductDTO productDto)
        {
            var productModel = await _context.Products.FirstOrDefaultAsync(product => product.ProductId == ProductId);
            if (productModel == null)
            {
                return NotFound();
            }
            productModel.Name = productDto.Name;
            productModel.Description = productDto.Description;
            productModel.Brand = productDto.Brand;
            productModel.Volume = productDto.Volume;
            productModel.ABV = productDto.ABV;

            await _context.SaveChangesAsync();
            return Ok(productModel.ToProductDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await _context.Products.FindAsync(id);
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