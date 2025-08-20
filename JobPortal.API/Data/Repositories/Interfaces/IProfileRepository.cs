using JobPortal.API.Models.Entities;

namespace JobPortal.API.Data.Repositories.Interfaces
{
    public interface IProfileRepository
    {
        Task<Profile?> GetProfileByIdAsync(long id);
        Task<Profile?> GetProfileByEmailAsync(string email);
        Task<IEnumerable<Profile>> GetAllProfilesAsync();
        Task AddProfileAsync(Profile profile);
        Task UpdateProfileAsync(Profile profile);
        Task DeleteProfileAsync(long id);
        Task<bool> ProfileExistsAsync(long id);
    }
}
