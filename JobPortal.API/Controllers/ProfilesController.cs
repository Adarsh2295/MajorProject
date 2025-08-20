using JobPortal.API.Models.DTOs;
using JobPortal.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobPortal.API.Exceptions;
using System.Security.Claims;

namespace JobPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize] // Temporarily removed for debugging - Requires authentication for all endpoints in this controller
    public class ProfilesController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly IUserService _userService; // To get user's profile ID

        public ProfilesController(IProfileService profileService, IUserService userService)
        {
            _profileService = profileService;
            _userService = userService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID claim not found.");
            }
            return long.Parse(userIdClaim);
        }

        private string GetCurrentUserRole()
        {
            return User.Claims.FirstOrDefault(c => c.Type == "role")?.Value ?? "";
        }

        [HttpGet("all")]
        [AllowAnonymous] // Temporarily allow anonymous access for debugging
        public async Task<IActionResult> GetAllProfiles()
        {
            try
            {
                var profiles = await _profileService.GetAllProfilesAsync();
                return Ok(profiles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error getting profiles", Details = ex.Message });
            }
        }

        [HttpGet("my-profile")]
        public async Task<IActionResult> GetMyProfile()
        {
            var currentUserId = GetCurrentUserId();
            var profile = await _profileService.GetProfileByUserIdAsync(currentUserId);
            if (profile == null)
            {
                return NotFound(new { Message = "Profile not found for the current user." });
            }
            return Ok(profile);
        }

        [HttpGet("{id:long}")]
        [AllowAnonymous] // Temporarily allow anonymous access for debugging
        public async Task<IActionResult> GetProfileById(long id)
        {
            // Temporarily comment out authorization for debugging
            // var currentUserId = GetCurrentUserId();
            // var currentUserRole = GetCurrentUserRole();
            // var user = await _userService.GetUserByIdAsync(currentUserId);
            // if (user == null || user.ProfileId != id)
            // {
            //     return Forbid(); // Not authorized to view this profile
            // }

            var profile = await _profileService.GetProfileByIdAsync(id);
            if (profile == null)
            {
                return NotFound(new { Message = "Profile not found." });
            }
            return Ok(profile);
        }


        [HttpPut("{id}")]
        [AllowAnonymous] // Temporarily allow anonymous access for debugging
        public async Task<IActionResult> UpdateProfile(long id, [FromBody] ProfileDto profileDto)
        {
            // Temporarily comment out authorization for debugging
            // var currentUserId = GetCurrentUserId();
            // var currentUserRole = GetCurrentUserRole();
            // var user = await _userService.GetUserByIdAsync(currentUserId);
            // if (user == null || user.ProfileId != id)
            // {
            //     return Forbid(); // Not authorized to update this profile
            // }

            try
            {
                var updatedProfile = await _profileService.UpdateProfileAsync(id, profileDto);
                return Ok(new { Message = "Profile updated successfully.", Profile = updatedProfile });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during profile update.", Details = ex.Message });
            }
        }

        [HttpPost("{profileId}/save-job/{jobId}")]
        public async Task<IActionResult> SaveJob(long profileId, long jobId)
        {
            // Authorization: User can only save jobs to their own profile
            var currentUserId = GetCurrentUserId();
            var user = await _userService.GetUserByIdAsync(currentUserId);
            if (user == null || user.ProfileId != profileId)
            {
                return Forbid();
            }

            try
            {
                var saved = await _profileService.SaveJobAsync(profileId, jobId);
                if (saved)
                {
                    return Ok(new { Message = "Job saved successfully." });
                }
                return Conflict(new { Message = "Job already saved to this profile." });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while saving job.", Details = ex.Message });
            }
        }

        [HttpDelete("{profileId}/unsave-job/{jobId}")]
        public async Task<IActionResult> UnsaveJob(long profileId, long jobId)
        {
            // Authorization: User can only unsave jobs from their own profile
            var currentUserId = GetCurrentUserId();
            var user = await _userService.GetUserByIdAsync(currentUserId);
            if (user == null || user.ProfileId != profileId)
            {
                return Forbid();
            }

            try
            {
                var unsaved = await _profileService.UnsaveJobAsync(profileId, jobId);
                if (unsaved)
                {
                    return Ok(new { Message = "Job unsaved successfully." });
                }
                return NotFound(new { Message = "Job not found in saved list for this profile." });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while unsaving job.", Details = ex.Message });
            }
        }
    }
}
