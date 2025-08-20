using JobPortal.API.Models.Entities;

namespace JobPortal.API.Data.Repositories.Interfaces
{
    public interface IJobRepository
    {
        Task<Job?> GetJobByIdAsync(long id);
        Task<IEnumerable<Job>> GetAllJobsAsync();
        Task AddJobAsync(Job job);
        Task UpdateJobAsync(Job job);
        Task DeleteJobAsync(long id);
        Task<bool> JobExistsAsync(long id);
        Task<IEnumerable<Job>> SearchJobsAsync(string? keyword, string? location, string? jobType, string? experience);
        Task<IEnumerable<Job>> GetJobsByRecruiterAsync(long recruiterId);
    }
}
