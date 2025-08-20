using JobPortal.API.Models.Entities;
using JobPortal.API.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobPortal.API.Data.Repositories.Implementations
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext _context;

        public JobRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Job?> GetJobByIdAsync(long id)
        {
            return await _context.Jobs.FindAsync(id);
        }

        public async Task<IEnumerable<Job>> GetAllJobsAsync()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task AddJobAsync(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateJobAsync(Job job)
        {
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteJobAsync(long id)
        {
            var job = await _context.Jobs.FindAsync(id);
            if (job != null)
            {
                _context.Jobs.Remove(job);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> JobExistsAsync(long id)
        {
            return await _context.Jobs.AnyAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<Job>> SearchJobsAsync(string? keyword, string? location, string? jobType, string? experience)
        {
            var query = _context.Jobs.AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(j => j.JobTitle.Contains(keyword) ||
                                         j.Company.Contains(keyword) ||
                                         j.Description!.Contains(keyword) ||
                                         j.Skills.Any(s => s.Contains(keyword)));
            }

            if (!string.IsNullOrWhiteSpace(location))
            {
                query = query.Where(j => j.Location!.Contains(location));
            }

            if (!string.IsNullOrWhiteSpace(jobType))
            {
                query = query.Where(j => j.JobType!.Contains(jobType));
            }

            if (!string.IsNullOrWhiteSpace(experience))
            {
                query = query.Where(j => j.Experience!.Contains(experience));
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Job>> GetJobsByRecruiterAsync(long recruiterId)
        {
            return await _context.Jobs
                .Where(j => j.PostedBy == recruiterId)
                .OrderByDescending(j => j.PostTime)
                .ToListAsync();
        }
    }
}
