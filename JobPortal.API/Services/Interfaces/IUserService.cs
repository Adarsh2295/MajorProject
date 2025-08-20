using JobPortal.API.Models.DTOs;
using JobPortal.API.Models.Entities;

namespace JobPortal.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> RegisterUserAsync(UserDto userDto);
        Task<AuthenticationResponse?> AuthenticateUserAsync(AuthenticationRequest authRequest);
        Task<UserDto?> GetUserByIdAsync(long id);
        Task<UserDto?> GetUserByEmailAsync(string email);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> UpdateUserAsync(long id, UserDto userDto);
        Task<bool> DeleteUserAsync(long id);
        Task<bool> SendOtpAsync(string email);
        Task<bool> VerifyOtpAsync(string email, string otp);
        Task<bool> ResetPasswordAsync(string email, string otp, string newPassword);
    }
}
