using JobPortal.API.Models.DTOs;
using JobPortal.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobPortal.API.Exceptions;

namespace JobPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Requires authentication for all endpoints in this controller
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Recruiter")] // Only Recruiters can get all users
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            // Ensure the user is authorized to view this profile (either self or admin)
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "accountType")?.Value;

            if (userIdClaim == null || long.Parse(userIdClaim) != id)
            {
                return Forbid(); // Not authorized to view this user's details
            }

            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "User not found." });
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, [FromBody] UserDto userDto)
        {
            // Ensure the user is authorized to update this profile (either self or admin)
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "accountType")?.Value;

            if (userIdClaim == null || long.Parse(userIdClaim) != id)
            {
                return Forbid(); // Not authorized to update this user's details
            }

            try
            {
                var updatedUser = await _userService.UpdateUserAsync(id, userDto);
                return Ok(new { Message = "User updated successfully.", User = updatedUser });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during user update.", Details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Recruiter")] // Only Recruiters can delete users
        public async Task<IActionResult> DeleteUser(long id)
        {
            var deleted = await _userService.DeleteUserAsync(id);
            if (!deleted)
            {
                return NotFound(new { Message = "User not found." });
            }
            return NoContent(); // 204 No Content
        }
    }
}
