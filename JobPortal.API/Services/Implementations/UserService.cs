using JobPortal.API.Data.Repositories.Interfaces;
using JobPortal.API.Exceptions;
using JobPortal.API.Helpers;
using JobPortal.API.Models.DTOs;
using JobPortal.API.Models.Entities;
using JobPortal.API.Models.Enums;
using JobPortal.API.Services.Interfaces;
using BCrypt.Net;

namespace JobPortal.API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly IOTPRepository _otpRepository;
        private readonly EmailService _emailService;
        private readonly JwtHelper _jwtHelper;

        public UserService(IUserRepository userRepository, IProfileRepository profileRepository,
                           IOTPRepository otpRepository, EmailService emailService, JwtHelper jwtHelper)
        {
            _userRepository = userRepository;
            _profileRepository = profileRepository;
            _otpRepository = otpRepository;
            _emailService = emailService;
            _jwtHelper = jwtHelper;
        }

        public async Task<UserDto?> RegisterUserAsync(UserDto userDto)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(userDto.Email);
            if (existingUser != null)
            {
                throw new JobPortalException("User with this email already exists.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = hashedPassword,
                AccountType = userDto.AccountType
            };

            await _userRepository.AddUserAsync(user);

            // Create a default profile for the new user
            var profile = new Profile
            {
                Name = user.Name,
                Email = user.Email,
                // Other default profile fields
            };
            await _profileRepository.AddProfileAsync(profile);

            // Link profile to user
            user.ProfileId = profile.Id;
            await _userRepository.UpdateUserAsync(user);

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                AccountType = user.AccountType,
                ProfileId = user.ProfileId
            };
        }

        public async Task<AuthenticationResponse?> AuthenticateUserAsync(AuthenticationRequest authRequest)
        {
            var user = await _userRepository.GetUserByEmailAsync(authRequest.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(authRequest.Password, user.Password))
            {
                throw new JobPortalException("Invalid credentials.");
            }

            var token = _jwtHelper.GenerateToken(user.Id, user.Email, user.AccountType.ToString());

            return new AuthenticationResponse
            {
                Token = token,
                Message = "Authentication successful",
                UserId = user.Id,
                AccountType = user.AccountType.ToString()
            };
        }

        public async Task<UserDto?> GetUserByIdAsync(long id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return user == null ? null : new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                AccountType = user.AccountType,
                ProfileId = user.ProfileId
            };
        }

        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            return user == null ? null : new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                AccountType = user.AccountType,
                ProfileId = user.ProfileId
            };
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return users.Select(user => new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                AccountType = user.AccountType,
                ProfileId = user.ProfileId
            });
        }

        public async Task<UserDto?> UpdateUserAsync(long id, UserDto userDto)
        {
            var userToUpdate = await _userRepository.GetUserByIdAsync(id);
            if (userToUpdate == null)
            {
                throw new JobPortalException("User not found.");
            }

            // Check if email is being changed to an existing email
            if (userToUpdate.Email != userDto.Email)
            {
                var existingUserWithNewEmail = await _userRepository.GetUserByEmailAsync(userDto.Email);
                if (existingUserWithNewEmail != null)
                {
                    throw new JobPortalException("Email already in use by another user.");
                }
            }

            userToUpdate.Name = userDto.Name;
            userToUpdate.Email = userDto.Email;
            userToUpdate.AccountType = userDto.AccountType;

            // Only update password if provided and different
            if (!string.IsNullOrWhiteSpace(userDto.Password) && !BCrypt.Net.BCrypt.Verify(userDto.Password, userToUpdate.Password))
            {
                userToUpdate.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            }

            await _userRepository.UpdateUserAsync(userToUpdate);

            return new UserDto
            {
                Id = userToUpdate.Id,
                Name = userToUpdate.Name,
                Email = userToUpdate.Email,
                AccountType = userToUpdate.AccountType,
                ProfileId = userToUpdate.ProfileId
            };
        }

        public async Task<bool> DeleteUserAsync(long id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return false;
            }
            await _userRepository.DeleteUserAsync(id);
            return true;
        }

        public async Task<bool> SendOtpAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                throw new JobPortalException("User not found with this email.");
            }

            var otpCode = new Random().Next(100000, 999999).ToString();
            var otp = new OTP
            {
                Email = email,
                OtpCode = otpCode,
                CreationTime = DateTime.UtcNow
            };

            await _otpRepository.AddOrUpdateOTPAsync(otp);

            var subject = "Job Portal Password Reset OTP";
            var body = $"Your OTP for password reset is: {otpCode}. This OTP is valid for 10 minutes.";

            return await _emailService.SendEmailAsync(email, subject, body);
        }

        public async Task<bool> VerifyOtpAsync(string email, string otpCode)
        {
            var storedOtp = await _otpRepository.GetOTPByEmailAsync(email);

            if (storedOtp == null || storedOtp.OtpCode != otpCode)
            {
                return false;
            }

            // OTP valid for 10 minutes
            if ((DateTime.UtcNow - storedOtp.CreationTime).TotalMinutes > 10)
            {
                await _otpRepository.DeleteOTPAsync(email); // Invalidate expired OTP
                return false;
            }

            return true;
        }

        public async Task<bool> ResetPasswordAsync(string email, string otpCode, string newPassword)
        {
            var isOtpValid = await VerifyOtpAsync(email, otpCode);
            if (!isOtpValid)
            {
                throw new JobPortalException("Invalid or expired OTP.");
            }

            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                throw new JobPortalException("User not found.");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _userRepository.UpdateUserAsync(user);
            await _otpRepository.DeleteOTPAsync(email); // Delete OTP after successful reset

            return true;
        }
    }
}
