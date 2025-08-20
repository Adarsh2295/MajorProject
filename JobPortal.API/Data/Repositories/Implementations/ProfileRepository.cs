using JobPortal.API.Models.Entities;
using JobPortal.API.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobPortal.API.Data.Repositories.Implementations
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Profile?> GetProfileByIdAsync(long id)
        {
            return await _context.Profiles.FindAsync(id);
        }

        public async Task<Profile?> GetProfileByEmailAsync(string email)
        {
            return await _context.Profiles.FirstOrDefaultAsync(p => p.Email == email);
        }

        public async Task<IEnumerable<Profile>> GetAllProfilesAsync()
        {
            return await _context.Profiles.ToListAsync();
        }

        public async Task AddProfileAsync(Profile profile)
        {
            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProfileAsync(Profile profile)
        {
            _context.Profiles.Update(profile);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProfileAsync(long id)
        {
            var profile = await _context.Profiles.FindAsync(id);
            if (profile != null)
            {
                _context.Profiles.Remove(profile);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ProfileExistsAsync(long id)
        {
            return await _context.Profiles.AnyAsync(e => e.Id == id);
        }
    }
}
