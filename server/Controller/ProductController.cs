using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;

namespace OneBottle.Controller
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }
    

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute]Guid id){
            var product = _context.Products.Find(id);
            if(product == null) {
                return NotFound();
            }
            return Ok(product);
        }
    }
}