using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.DTOs.Admin;
using OneBottle.Interfaces;
using OneBottle.Mappers;


namespace OneBottle.Controller
{
    [Route("api/admin")]
    [ApiController]

    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAdminRepository _adminRepo;
        public AdminController(AppDbContext context, IAdminRepository adminRepo)
        {
            _context = context;
            _adminRepo = adminRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAdmin()
        {
            var admins = await _adminRepo.GetAllAdminsAsync();
            var adminsReturnedFromDb = admins.Select(admin => AdminMappers.CreateToAdminDTO(admin));
            return Ok(adminsReturnedFromDb);
        }

        [HttpGet("{adminId:guid}")]
        public async Task<IActionResult> GetById(Guid adminId)
        {
            var admin = await _adminRepo.GetAdminByIdAsync(adminId);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(AdminMappers.CreateToAdminDTO(admin));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var admin = await _adminRepo.GetAdminByUsernameAsync(username);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(AdminMappers.CreateToAdminDTO(admin));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminDTO adminDTO)
        {
            var adminModel = AdminMappers.ToAdminModel(adminDTO);
            await _adminRepo.AddAdminAsync(adminModel);
            var createdAdminDTO = AdminMappers.CreateToAdminDTO(adminModel);
            return CreatedAtAction(nameof(GetById), new { adminId = adminModel.AdminId }, createdAdminDTO); //toadminDTO defination is not found 
        }


        [HttpPut]
        [Route("{Id:guid}")]
        public async Task<IActionResult> UpdateAdmin([FromBody] UpdateAdminDTO newAdmin, Guid Id)
        {
            var existingAdmin = await _adminRepo.GetAdminByIdAsync(Id);
            if (existingAdmin == null)
            {
                return NotFound();
            }
            existingAdmin.Username = newAdmin.Username;
            existingAdmin.Email = newAdmin.Email;
            existingAdmin.Password = newAdmin.Password; // Remember to hash passwords

            // var admin = AdminMappers.ToAdminModelFromUpdate(newAdmin, Id);
            await _adminRepo.UpdateAdminAsync(existingAdmin);
            return Ok(AdminMappers.CreateToAdminDTO(existingAdmin));
        }


        [HttpDelete]
        [Route("{adminId:guid}")]
        public async Task<IActionResult> DeleteAdmin(Guid adminId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var adminExist = await _adminRepo.GetAdminByIdAsync(adminId);
            if (adminExist == null)
            {
                return NotFound();
            }
            await _adminRepo.DeleteAdminAsync(adminId);
            return NoContent();
        }
    }
}
