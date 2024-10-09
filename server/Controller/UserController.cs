using Microsoft.AspNetCore.Mvc;
using OneBottle.Interfaces;
using OneBottle.Data;
using OneBottle.DTOs.User;

namespace OneBottle.Controller{
[Route("/api/user")]
[ApiController]
public class UserController: ControllerBase{
    private readonly AppDbContext _context;
   private readonly IUserRepository _userRepository;
    public UserController(IUserRepository userRepository, AppDbContext context) {
        _context = context;
        _userRepository = userRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody]UserDTO userDTO){

    }
}
}
