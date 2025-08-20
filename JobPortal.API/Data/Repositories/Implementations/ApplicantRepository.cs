using JobPortal.API.Models.Entities;
using JobPortal.API.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobPortal.API.Data.Repositories.Implementations
{
    public class ApplicantRepository : IApplicantRepository
    {
        private readonly ApplicationDbContext _context;

        public ApplicantRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Applicant?> GetApplicantByIdAsync(long id)
        {
            return await _context.Applicants.FindAsync(id);
        }

        public async Task<IEnumerable<Applicant>> GetApplicantsByJobIdAsync(long jobId)
        {
            return await _context.Applicants.Where(a => a.JobId == jobId).ToListAsync();
        }

        public async Task<IEnumerable<Applicant>> GetApplicantsByApplicantIdAsync(long applicantId)
        {
            return await _context.Applicants.Where(a => a.ApplicantId == applicantId).ToListAsync();
        }

        public async Task AddApplicantAsync(Applicant applicant)
        {
            _context.Applicants.Add(applicant);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateApplicantAsync(Applicant applicant)
        {
            _context.Applicants.Update(applicant);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteApplicantAsync(long id)
        {
            var applicant = await _context.Applicants.FindAsync(id);
            if (applicant != null)
            {
                _context.Applicants.Remove(applicant);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> ApplicantExistsAsync(long id)
        {
            return await _context.Applicants.AnyAsync(e => e.Id == id);
        }
    }
}
