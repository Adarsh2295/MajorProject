using JobPortal.API.Models.Entities;
using JobPortal.API.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobPortal.API.Data.Repositories.Implementations
{
    public class OTPRepository : IOTPRepository
    {
        private readonly ApplicationDbContext _context;

        public OTPRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<OTP?> GetOTPByEmailAsync(string email)
        {
            return await _context.OTPs.FindAsync(email);
        }

        public async Task AddOrUpdateOTPAsync(OTP otp)
        {
            var existingOtp = await _context.OTPs.FindAsync(otp.Email);
            if (existingOtp == null)
            {
                _context.OTPs.Add(otp);
            }
            else
            {
                existingOtp.OtpCode = otp.OtpCode;
                existingOtp.CreationTime = otp.CreationTime;
                _context.OTPs.Update(existingOtp);
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOTPAsync(string email)
        {
            var otp = await _context.OTPs.FindAsync(email);
            if (otp != null)
            {
                _context.OTPs.Remove(otp);
                await _context.SaveChangesAsync();
            }
        }
    }
}
