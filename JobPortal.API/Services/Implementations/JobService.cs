using JobPortal.API.Data.Repositories.Interfaces;
using JobPortal.API.Exceptions;
using JobPortal.API.Models.DTOs;
using JobPortal.API.Models.Entities;
using JobPortal.API.Services.Interfaces;

namespace JobPortal.API.Services.Implementations
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _jobRepository;

        public JobService(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<JobDto?> CreateJobAsync(JobDto jobDto)
        {
            var job = new Job
            {
                JobTitle = jobDto.JobTitle,
                Company = jobDto.Company,
                About = jobDto.About,
                Experience = jobDto.Experience,
                JobType = jobDto.JobType,
                Location = jobDto.Location,
                PackageOffered = jobDto.PackageOffered,
                PostTime = DateTime.UtcNow, // Set creation time
                Description = jobDto.Description,
                JobStatus = jobDto.JobStatus,
                PostedBy = jobDto.PostedBy,
                Skills = jobDto.Skills
            };

            await _jobRepository.AddJobAsync(job);
            return MapToDto(job);
        }

        public async Task<JobDto?> GetJobByIdAsync(long id)
        {
            var job = await _jobRepository.GetJobByIdAsync(id);
            return job == null ? null : MapToDto(job);
        }

        public async Task<IEnumerable<JobDto>> GetAllJobsAsync()
        {
            var jobs = await _jobRepository.GetAllJobsAsync();
            return jobs.Select(job => MapToDto(job));
        }

        public async Task<IEnumerable<JobDto>> SearchJobsAsync(string? keyword, string? location, string? jobType, string? experience)
        {
            var jobs = await _jobRepository.SearchJobsAsync(keyword, location, jobType, experience);
            return jobs.Select(job => MapToDto(job));
        }

        public async Task<IEnumerable<JobDto>> GetJobsByRecruiterAsync(long recruiterId)
        {
            var jobs = await _jobRepository.GetJobsByRecruiterAsync(recruiterId);
            return jobs.Select(job => MapToDto(job));
        }

        public async Task<JobDto?> UpdateJobAsync(long id, JobDto jobDto)
        {
            var jobToUpdate = await _jobRepository.GetJobByIdAsync(id);
            if (jobToUpdate == null)
            {
                throw new JobPortalException("Job not found.");
            }

            jobToUpdate.JobTitle = jobDto.JobTitle;
            jobToUpdate.Company = jobDto.Company;
            jobToUpdate.About = jobDto.About;
            jobToUpdate.Experience = jobDto.Experience;
            jobToUpdate.JobType = jobDto.JobType;
            jobToUpdate.Location = jobDto.Location;
            jobToUpdate.PackageOffered = jobDto.PackageOffered;
            jobToUpdate.Description = jobDto.Description;
            jobToUpdate.JobStatus = jobDto.JobStatus;
            jobToUpdate.Skills = jobDto.Skills;

            await _jobRepository.UpdateJobAsync(jobToUpdate);
            return MapToDto(jobToUpdate);
        }

        public async Task<bool> DeleteJobAsync(long id)
        {
            var job = await _jobRepository.GetJobByIdAsync(id);
            if (job == null)
            {
                return false;
            }
            await _jobRepository.DeleteJobAsync(id);
            return true;
        }

        private JobDto MapToDto(Job job)
        {
            return new JobDto
            {
                Id = job.Id,
                JobTitle = job.JobTitle,
                Company = job.Company,
                About = job.About,
                Experience = job.Experience,
                JobType = job.JobType,
                Location = job.Location,
                PackageOffered = job.PackageOffered,
                PostTime = job.PostTime,
                Description = job.Description,
                JobStatus = job.JobStatus,
                PostedBy = job.PostedBy,
                Skills = job.Skills
            };
        }
    }
}
