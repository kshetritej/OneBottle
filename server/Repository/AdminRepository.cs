using OneBottle.Data;
using OneBottle.DTOs.Admin;
using OneBottle.Interfaces;
using OneBottle.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace OneBottle.Repository;
public class AdminRepository : IAdminRepository
{
    private readonly AppDbContext _context;
    public AdminRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task CreateAdminAsync(CreateAdminDTO admin)
    {
        await _context.Admins.AddAsync(new Admin 
        {
            Username = admin.Username,
            Email = admin.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(admin.Password, 10)
        });
        await _context.SaveChangesAsync();
    }

    public async Task<Admin> DeleteAdmin(Guid adminId)
    {
        var admin = await _context.Admins.FindAsync(adminId) ?? throw new Exception("Admin not found");
        return admin;
    }

    public async Task<Admin> GetAdminByEmailAsync(string email)
    {
        var admin = await _context.Admins.Where(a => a.Email == email).FirstOrDefaultAsync() ?? throw new Exception("Admin not found");
        return admin;
    }

    public async Task<Admin> GetAdminById(Guid adminId)
    {
        var admin = await _context.Admins.FindAsync(adminId) ?? throw new Exception("Admin not found");
        return admin;
    }

    public async Task<Admin> GetAdminByIdAsync(Guid adminId)
    {
        return await _context.Admins.FindAsync(adminId) ?? throw new Exception("Admin not found");
    }

    public async Task<Admin> UpdateAdminAsync(Guid adminId, UpdateAdminDTO admin)
    {
        var adminToUpdate = await _context.Admins.FindAsync(adminId) ?? throw new Exception("Admin not found");
        adminToUpdate.Username = admin.Username;
        adminToUpdate.Email = admin.Email;
        adminToUpdate.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password, 10);
        await _context.SaveChangesAsync();
        return adminToUpdate;
    }
}