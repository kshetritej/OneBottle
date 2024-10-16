using Microsoft.AspNetCore.Mvc;
using OneBottle.Interfaces;
using OneBottle.Data;
using OneBottle.DTOs.User;
using OneBottle.Models;
using OneBottle.Mappers;

namespace OneBottle.Controller
{
    [Route("/api/user")]
    [ApiController]
    public class UserController(AppDbContext context, IUserRepository userRepository) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly IUserRepository _userRepository = userRepository;

        [HttpPost("/register")]
        public async Task<IActionResult> Register(CreateUserDTO userDTO)
        {
            var user = new User
            {
                UserId = Guid.NewGuid(),
                Username = userDTO.Username,
                DateOfBirth = userDTO.DateOfBirth,
                Email = userDTO.Email,
                Password = userDTO.Password
            };
            await _userRepository.AddUserAsync(user);
            return Ok(user);
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login(UserLoginDTO userDTO)
        {
            var user = await _userRepository.GetUserByIdEmail(userDTO.Email);
            if (user == null)
            {
                return NotFound();
            }
            if (user.Password != userDTO.Password)
            {
                return Unauthorized();
            }
            return Ok(user.ToUserDTO());
        }
    }
}
