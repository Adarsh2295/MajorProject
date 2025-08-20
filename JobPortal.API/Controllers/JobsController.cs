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
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
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

        [HttpGet("test")]
        [AllowAnonymous]
        public IActionResult TestEndpoint()
        {
            return Ok(new { Message = "Backend is working!", Timestamp = DateTime.Now });
        }

        [HttpPost]
        [AllowAnonymous] // Temporarily public for testing
        public async Task<IActionResult> CreateJob([FromBody] JobDto jobDto)
        {
            // Debug: Log all claims
            var currentUserRole = GetCurrentUserRole();
            Console.WriteLine($"Debug - Current user role: '{currentUserRole}'");
            Console.WriteLine($"Debug - All claims:");
            foreach (var claim in User.Claims)
            {
                Console.WriteLine($"  {claim.Type}: {claim.Value}");
            }
            
            // For testing, use the postedBy from the request or default to 1
            if (jobDto.PostedBy == 0)
            {
                try
                {
                    jobDto.PostedBy = GetCurrentUserId();
                }
                catch
                {
                    jobDto.PostedBy = 1; // Default for testing
                }
            }

            try
            {
                var createdJob = await _jobService.CreateJobAsync(jobDto);
                return StatusCode(201, new { Message = "Job created successfully.", Job = createdJob });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during job creation.", Details = ex.Message });
            }
        }

        [HttpGet]
        [AllowAnonymous] // Anyone can view all jobs
        public async Task<IActionResult> GetAllJobs()
        {
            var jobs = await _jobService.GetAllJobsAsync();
            return Ok(jobs);
        }

        [HttpGet("search")]
        [AllowAnonymous] // Anyone can search jobs
        public async Task<IActionResult> SearchJobs(
            [FromQuery] string? keyword,
            [FromQuery] string? location,
            [FromQuery] string? jobType,
            [FromQuery] string? experience)
        {
            var jobs = await _jobService.SearchJobsAsync(keyword, location, jobType, experience);
            return Ok(jobs);
        }

        [HttpGet("postedBy/{recruiterId}")]
        [AllowAnonymous] // Temporarily allow anonymous access for debugging
        public async Task<IActionResult> GetJobsByRecruiter(long recruiterId)
        {
            // Temporarily comment out authorization for debugging
            // var currentUserId = GetCurrentUserId();
            // var currentUserRole = GetCurrentUserRole();
            // if (recruiterId != currentUserId)
            // {
            //     return Forbid(); // Not authorized to view other recruiter's jobs
            // }

            var jobs = await _jobService.GetJobsByRecruiterAsync(recruiterId);
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        [AllowAnonymous] // Anyone can view a specific job
        public async Task<IActionResult> GetJobById(long id)
        {
            var job = await _jobService.GetJobByIdAsync(id);
            if (job == null)
            {
                return NotFound(new { Message = "Job not found." });
            }
            return Ok(job);
        }

        [HttpPut("{id}")]
        [AllowAnonymous] // Temporarily allow anonymous access for debugging
        public async Task<IActionResult> UpdateJob(long id, [FromBody] JobDto jobDto)
        {
            // Temporarily comment out authorization for debugging
            var jobToUpdate = await _jobService.GetJobByIdAsync(id);
            if (jobToUpdate == null)
            {
                return NotFound(new { Message = "Job not found." });
            }

            // var currentUserId = GetCurrentUserId();
            // var currentUserRole = GetCurrentUserRole();
            // if (jobToUpdate.PostedBy != currentUserId)
            // {
            //     return Forbid(); // Not authorized to update this job
            // }

            try
            {
                var updatedJob = await _jobService.UpdateJobAsync(id, jobDto);
                return Ok(new { Message = "Job updated successfully.", Job = updatedJob });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during job update.", Details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Recruiter")] // Only recruiters can delete jobs
        public async Task<IActionResult> DeleteJob(long id)
        {
            // Authorization: Only the original poster or an admin can delete the job
            var jobToDelete = await _jobService.GetJobByIdAsync(id);
            if (jobToDelete == null)
            {
                return NotFound(new { Message = "Job not found." });
            }

            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            if (jobToDelete.PostedBy != currentUserId)
            {
                return Forbid(); // Not authorized to delete this job
            }

            var deleted = await _jobService.DeleteJobAsync(id);
            if (!deleted)
            {
                return NotFound(new { Message = "Job not found." });
            }
            return NoContent(); // 204 No Content
        }

        // Additional endpoints for frontend compatibility
        [HttpPost("apply/{jobId}")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> ApplyForJob(long jobId, [FromBody] dynamic applicantData)
        {
            // Redirect to ApplicantsController
            // This is a compatibility endpoint - actual implementation is in ApplicantsController
            return BadRequest(new { Message = "Please use /api/applicants endpoint for job applications." });
        }

        [HttpPost("changeAppStatus")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> ChangeApplicationStatus([FromBody] dynamic applicationData)
        {
            // Redirect to ApplicantsController
            // This is a compatibility endpoint - actual implementation is in ApplicantsController
            return BadRequest(new { Message = "Please use /api/applicants/{id}/status endpoint for changing application status." });
        }
    }
}
