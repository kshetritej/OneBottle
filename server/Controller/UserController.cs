using Microsoft.AspNetCore.Mvc;
using OneBottle.Interfaces;
using OneBottle.Data;
using OneBottle.DTOs.User;
using OneBottle.Models;
using OneBottle.Mappers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace OneBottle.Controller
{
    [Route("/api/user")]
    [ApiController]
    public class UserController(AppDbContext context, IUserRepository userRepository) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly IUserRepository _userRepository = userRepository;


        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return Ok(users.Select(u => u.ToUserDTO()));
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register(CreateUserDTO userDTO)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            var user = new User
            {
                UserId = Guid.NewGuid(),
                Username = userDTO.Username,
                DateOfBirth = userDTO.DateOfBirth,
                Email = userDTO.Email,
                Password = hashedPassword,
            };
            await _userRepository.AddUserAsync(user);
            return Ok(user.ToUserDTO());
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login(UserLoginDTO userDTO)
        {
            var user = await _userRepository.GetUserByIdEmail(userDTO.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDTO.Password, user.Password))
            {
                return Unauthorized("Invalid email or password.");
            }
            return Ok(user.ToUserDTO());
        }
    }
}
