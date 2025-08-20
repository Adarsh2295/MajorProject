using JobPortal.API.Models.DTOs;

namespace JobPortal.API.Services.Interfaces
{
    public interface IJobService
    {
        Task<JobDto?> CreateJobAsync(JobDto jobDto);
        Task<JobDto?> GetJobByIdAsync(long id);
        Task<IEnumerable<JobDto>> GetAllJobsAsync();
        Task<IEnumerable<JobDto>> SearchJobsAsync(string? keyword, string? location, string? jobType, string? experience);
        Task<IEnumerable<JobDto>> GetJobsByRecruiterAsync(long recruiterId);
        Task<JobDto?> UpdateJobAsync(long id, JobDto jobDto);
        Task<bool> DeleteJobAsync(long id);
    }
}
