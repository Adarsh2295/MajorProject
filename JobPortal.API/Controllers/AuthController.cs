using JobPortal.API.Models.DTOs;
using JobPortal.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using JobPortal.API.Exceptions;

namespace JobPortal.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            try
            {
                var registeredUser = await _userService.RegisterUserAsync(userDto);
                return StatusCode(201, new { Message = "User registered successfully", User = registeredUser });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during registration.", Details = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthenticationRequest authRequest)
        {
            try
            {
                var response = await _userService.AuthenticateUserAsync(authRequest);
                return Ok(response);
            }
            catch (JobPortalException ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during login.", Details = ex.Message });
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromQuery] string email)
        {
            try
            {
                var sent = await _userService.SendOtpAsync(email);
                if (sent)
                {
                    return Ok(new { Message = "OTP sent to your email." });
                }
                return StatusCode(500, new { Message = "Failed to send OTP." });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromQuery] string email, [FromQuery] string otp)
        {
            try
            {
                var isValid = await _userService.VerifyOtpAsync(email, otp);
                if (isValid)
                {
                    return Ok(new { Message = "OTP verified successfully." });
                }
                return BadRequest(new { Message = "Invalid or expired OTP." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromQuery] string email, [FromQuery] string otp, [FromBody] string newPassword)
        {
            try
            {
                var reset = await _userService.ResetPasswordAsync(email, otp, newPassword);
                if (reset)
                {
                    return Ok(new { Message = "Password reset successfully." });
                }
                return BadRequest(new { Message = "Failed to reset password. Invalid OTP or email." });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
            }
        }
    }
}
