using JobPortal.API.Models.Entities;

namespace JobPortal.API.Data.Repositories.Interfaces
{
    public interface IOTPRepository
    {
        Task<OTP?> GetOTPByEmailAsync(string email);
        Task AddOrUpdateOTPAsync(OTP otp);
        Task DeleteOTPAsync(string email);
    }
}
