using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.DTOs;
using OneBottle.DTOs.Admin;
using OneBottle.Interfaces;
using OneBottle.Mappers;
using OneBottle.Models;

namespace OneBottle.Controller
{
    [Route("/api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;
        private readonly AppDbContext _context;
        public AdminController(IAdminRepository adminRepository, AppDbContext context)
        {
            _adminRepository = adminRepository;
            _context = context;

        }
        [HttpPost("/add-admin")]
        public async Task<IActionResult> AddAdmin(CreateAdminDTO adminDTO)
        {
            var admin = new CreateAdminDTO
            {
                AdminId = Guid.NewGuid(),
                Username = adminDTO.Username,
                Email = adminDTO.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(adminDTO.Password, 10),
            };
            await _adminRepository.CreateAdminAsync(admin);
            return Ok(admin);
        }

        [HttpPost("/admin-login")]
        public async Task<IActionResult> Login(AdminLoginDTO adminDTO)
        {
            var admin = await _adminRepository.GetAdminByEmailAsync(adminDTO.Email);
            if (admin == null)
            {
                return NotFound();
            }
            var IsPasswordCorrect = BCrypt.Net.BCrypt.Verify(adminDTO.Password, admin.Password);
            if (!IsPasswordCorrect)
            {
                return Unauthorized();
            }
            return Ok(admin.ToAdminDTO());
        }
    }
}