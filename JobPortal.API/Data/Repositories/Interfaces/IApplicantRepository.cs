using JobPortal.API.Models.Entities;

namespace JobPortal.API.Data.Repositories.Interfaces
{
    public interface IApplicantRepository
    {
        Task<Applicant?> GetApplicantByIdAsync(long id);
        Task<IEnumerable<Applicant>> GetApplicantsByJobIdAsync(long jobId);
        Task<IEnumerable<Applicant>> GetApplicantsByApplicantIdAsync(long applicantId);
        Task AddApplicantAsync(Applicant applicant);
        Task UpdateApplicantAsync(Applicant applicant);
        Task<bool> DeleteApplicantAsync(long id);
        Task<bool> ApplicantExistsAsync(long id);
    }
}
