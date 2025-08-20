using JobPortal.API.Data.Repositories.Interfaces;
using JobPortal.API.Exceptions;
using JobPortal.API.Models.DTOs;
using JobPortal.API.Models.Entities;
using JobPortal.API.Services.Interfaces;

namespace JobPortal.API.Services.Implementations
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IUserRepository _userRepository;
        private readonly IJobRepository _jobRepository;

        public ProfileService(IProfileRepository profileRepository, IUserRepository userRepository, IJobRepository jobRepository)
        {
            _profileRepository = profileRepository;
            _userRepository = userRepository;
            _jobRepository = jobRepository;
        }

        public async Task<ProfileDto?> GetProfileByIdAsync(long id)
        {
            var profile = await _profileRepository.GetProfileByIdAsync(id);
            return profile == null ? null : MapToDto(profile);
        }

        public async Task<ProfileDto?> GetProfileByUserIdAsync(long userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null || user.ProfileId == null)
            {
                return null;
            }
            var profile = await _profileRepository.GetProfileByIdAsync(user.ProfileId.Value);
            return profile == null ? null : MapToDto(profile);
        }

        public async Task<IEnumerable<ProfileDto>> GetAllProfilesAsync()
        {
            var profiles = await _profileRepository.GetAllProfilesAsync();
            return profiles.Select(MapToDto);
        }

        public async Task<ProfileDto?> UpdateProfileAsync(long id, ProfileDto profileDto)
        {
            var profileToUpdate = await _profileRepository.GetProfileByIdAsync(id);
            if (profileToUpdate == null)
            {
                throw new JobPortalException("Profile not found.");
            }

            profileToUpdate.Name = profileDto.Name;
            profileToUpdate.Email = profileDto.Email;
            profileToUpdate.JobTitle = profileDto.JobTitle;
            profileToUpdate.Company = profileDto.Company;
            profileToUpdate.Location = profileDto.Location;
            profileToUpdate.About = profileDto.About;
            profileToUpdate.TotalExp = profileDto.TotalExp;

            if (!string.IsNullOrEmpty(profileDto.PictureBase64))
            {
                profileToUpdate.Picture = Convert.FromBase64String(profileDto.PictureBase64);
            }
            else if (profileDto.PictureBase64 == "") // If client explicitly sends empty string, clear picture
            {
                profileToUpdate.Picture = null;
            }

            // Update complex types (Skills, Experiences, Certifications, SavedJobIds)
            profileToUpdate.Skills = profileDto.Skills;
            profileToUpdate.Experiences = profileDto.Experiences.Select(e => new Experience
            {
                ExpJobTitle = e.ExpJobTitle,
                ExpCompany = e.ExpCompany,
                Location = e.Location,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                Working = e.Working,
                ExpDescription = e.ExpDescription
            }).ToList();
            profileToUpdate.Certifications = profileDto.Certifications.Select(c => new Certification
            {
                CertName = c.CertName,
                CertOrganization = c.CertOrganization,
                IssueDate = c.IssueDate,
                ExpiryDate = c.ExpiryDate,
                CredentialUrl = c.CredentialUrl
            }).ToList();
            profileToUpdate.SavedJobIds = profileDto.SavedJobIds;


            await _profileRepository.UpdateProfileAsync(profileToUpdate);

            return MapToDto(profileToUpdate);
        }

        public async Task<bool> SaveJobAsync(long profileId, long jobId)
        {
            var profile = await _profileRepository.GetProfileByIdAsync(profileId);
            if (profile == null)
            {
                throw new JobPortalException("Profile not found.");
            }

            var job = await _jobRepository.GetJobByIdAsync(jobId);
            if (job == null)
            {
                throw new JobPortalException("Job not found.");
            }

            if (!profile.SavedJobIds.Contains(jobId))
            {
                profile.SavedJobIds.Add(jobId);
                await _profileRepository.UpdateProfileAsync(profile);
                return true;
            }
            return false; // Job already saved
        }

        public async Task<bool> UnsaveJobAsync(long profileId, long jobId)
        {
            var profile = await _profileRepository.GetProfileByIdAsync(profileId);
            if (profile == null)
            {
                throw new JobPortalException("Profile not found.");
            }

            if (profile.SavedJobIds.Contains(jobId))
            {
                profile.SavedJobIds.Remove(jobId);
                await _profileRepository.UpdateProfileAsync(profile);
                return true;
            }
            return false; // Job not found in saved list
        }

        private ProfileDto MapToDto(Profile profile)
        {
            return new ProfileDto
            {
                Id = profile.Id,
                Name = profile.Name,
                Email = profile.Email,
                JobTitle = profile.JobTitle,
                Company = profile.Company,
                Location = profile.Location,
                About = profile.About,
                PictureBase64 = profile.Picture != null ? Convert.ToBase64String(profile.Picture) : null,
                TotalExp = profile.TotalExp,
                Skills = profile.Skills,
                Experiences = profile.Experiences.Select(e => new ExperienceDto
                {
                    ExpJobTitle = e.ExpJobTitle,
                    ExpCompany = e.ExpCompany,
                    Location = e.Location,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    Working = e.Working,
                    ExpDescription = e.ExpDescription
                }).ToList(),
                Certifications = profile.Certifications.Select(c => new CertificationDto
                {
                    CertName = c.CertName,
                    CertOrganization = c.CertOrganization,
                    IssueDate = c.IssueDate,
                    ExpiryDate = c.ExpiryDate,
                    CredentialUrl = c.CredentialUrl
                }).ToList(),
                SavedJobIds = profile.SavedJobIds
            };
        }
    }
}
