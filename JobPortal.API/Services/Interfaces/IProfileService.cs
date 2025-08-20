using JobPortal.API.Models.DTOs;

namespace JobPortal.API.Services.Interfaces
{
    public interface IProfileService
    {
        Task<ProfileDto?> GetProfileByIdAsync(long id);
        Task<ProfileDto?> GetProfileByUserIdAsync(long userId);
        Task<IEnumerable<ProfileDto>> GetAllProfilesAsync();
        Task<ProfileDto?> UpdateProfileAsync(long id, ProfileDto profileDto);
        Task<bool> SaveJobAsync(long profileId, long jobId);
        Task<bool> UnsaveJobAsync(long profileId, long jobId);
    }
}
