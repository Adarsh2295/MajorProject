// [ ... other usings ... ]
using JobPortal.API.Models.DTOs;
using JobPortal.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobPortal.API.Data.Repositories.Interfaces;
using JobPortal.API.Models.Entities;
using JobPortal.API.Models.Enums;
using System.Security.Claims;

namespace JobPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize] // Temporarily removed for debugging
    public class ApplicantsController : ControllerBase
    {
        private readonly IApplicantRepository _applicantRepository;
        private readonly IJobRepository _jobRepository;
        private readonly IUserRepository _userRepository;
        private readonly INotificationService _notificationService;

        public ApplicantsController(
            IApplicantRepository applicantRepository,
            IJobRepository jobRepository,
            IUserRepository userRepository,
            INotificationService notificationService)
        {
            _applicantRepository = applicantRepository;
            _jobRepository = jobRepository;
            _userRepository = userRepository;
            _notificationService = notificationService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            if (userIdClaim == null)
                throw new UnauthorizedAccessException("User ID claim not found.");
            return long.Parse(userIdClaim);
        }

        private string GetCurrentUserRole()
        {
            // Try both the short form and the full URI form of the role claim
            var roleClaim = User.Claims.FirstOrDefault(c => c.Type == "role")?.Value
                         ?? User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value
                         ?? "";
            return roleClaim;
        }

        [HttpPost]
        [Authorize(Roles = "JobSeeker")] // Re-enabled authorization
        public async Task<IActionResult> ApplyForJob([FromForm] ApplicantDto applicantDto, IFormFile? resumeFile)
        {
            var currentUserId = GetCurrentUserId();
            if (applicantDto.ApplicantId != currentUserId)
                return Forbid();

            var job = await _jobRepository.GetJobByIdAsync(applicantDto.JobId);
            if (job == null)
                return NotFound(new { Message = "Job not found." });

            var existingApplications = await _applicantRepository.GetApplicantsByApplicantIdAsync(currentUserId);
            if (existingApplications.Any(a => a.JobId == applicantDto.JobId))
                return Conflict(new { Message = "You have already applied for this job." });

            byte[]? resumeBytes = null;
            if (resumeFile != null)
            {
                using var ms = new MemoryStream();
                await resumeFile.CopyToAsync(ms);
                resumeBytes = ms.ToArray();
            }

            var applicant = new Applicant
            {
                ApplicantId = applicantDto.ApplicantId,
                Name = applicantDto.Name,
                Email = applicantDto.Email,
                Phone = applicantDto.Phone,
                Website = applicantDto.Website,
                Resume = resumeBytes,
                CoverLetter = applicantDto.CoverLetter,
                TimeStamp = DateTime.UtcNow,
                ApplicationStatus = ApplicationStatus.Applied,
                JobId = applicantDto.JobId
            };

            try
            {
                await _applicantRepository.AddApplicantAsync(applicant);

                // FIXED HERE: removed "var result = "
                await _notificationService.CreateNotificationAsync(new NotificationDto
                {
                    UserId = job.PostedBy,
                    Message = $"New application for your job: '{job.JobTitle}' from {applicant.Name}.",
                    Action = "NEW_APPLICATION",
                    Route = $"/dashboard/jobs/{job.Id}/applicants"
                });

                return StatusCode(201, new { Message = "Application submitted successfully.", Applicant = MapToDto(applicant) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during application submission.", Details = ex.Message });
            }
        }

        [HttpGet("job/{jobId}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> GetApplicantsForJob(long jobId)
        {
            var job = await _jobRepository.GetJobByIdAsync(jobId);
            if (job == null)
                return NotFound(new { Message = "Job not found." });

            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            if (job.PostedBy != currentUserId)
                return Forbid();

            var applicants = await _applicantRepository.GetApplicantsByJobIdAsync(jobId);
            return Ok(applicants.Select(MapToDto));
        }

        [HttpGet("my-applications")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> GetMyApplications()
        {
            var currentUserId = GetCurrentUserId();
            var applications = await _applicantRepository.GetApplicantsByApplicantIdAsync(currentUserId);
            return Ok(applications.Select(MapToDto));
        }

        [HttpGet("{id}")]
        [Authorize] // Add authorization to ensure user is authenticated
        public async Task<IActionResult> GetApplicantById(long id)
        {
            var applicant = await _applicantRepository.GetApplicantByIdAsync(id);
            if (applicant == null)
                return NotFound(new { Message = "Applicant not found." });

            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();
            var job = await _jobRepository.GetJobByIdAsync(applicant.JobId);

            if (applicant.ApplicantId != currentUserId && (job?.PostedBy != currentUserId))
                return Forbid();

            return Ok(MapToDto(applicant));
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> UpdateApplicantStatus(long id, [FromQuery] ApplicationStatus newStatus, [FromQuery] DateTime? interviewTime = null)
        {
            var applicantToUpdate = await _applicantRepository.GetApplicantByIdAsync(id);
            if (applicantToUpdate == null)
                return NotFound(new { Message = "Applicant not found." });

            var job = await _jobRepository.GetJobByIdAsync(applicantToUpdate.JobId);
            if (job == null)
                return NotFound(new { Message = "Associated job not found." });

            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            if (job.PostedBy != currentUserId)
                return Forbid();

            applicantToUpdate.ApplicationStatus = newStatus;
            applicantToUpdate.InterviewTime = interviewTime;

            try
            {
                await _applicantRepository.UpdateApplicantAsync(applicantToUpdate);

                await _notificationService.CreateNotificationAsync(new NotificationDto
                {
                    UserId = applicantToUpdate.ApplicantId,
                    Message = $"Your application for '{job.JobTitle}' has been updated to: {newStatus}.",
                    Action = "APPLICATION_STATUS_UPDATE",
                    Route = $"/dashboard/my-applications/{applicantToUpdate.Id}"
                });

                return Ok(new { Message = "Applicant status updated successfully.", Applicant = MapToDto(applicantToUpdate) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during status update.", Details = ex.Message });
            }
        }

        [HttpPut("{id}/respond")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> RespondToOffer(long id, [FromQuery] bool accept)
        {
            var applicantToUpdate = await _applicantRepository.GetApplicantByIdAsync(id);
            if (applicantToUpdate == null)
                return NotFound(new { Message = "Application not found." });

            var currentUserId = GetCurrentUserId();

            // Ensure the current user is the applicant
            if (applicantToUpdate.ApplicantId != currentUserId)
                return Forbid();

            // Can only respond if the current status is "Hired" (offer made)
            if (applicantToUpdate.ApplicationStatus != ApplicationStatus.Hired)
                return BadRequest(new { Message = "Can only respond to job offers. Current status does not allow this action." });

            var job = await _jobRepository.GetJobByIdAsync(applicantToUpdate.JobId);
            if (job == null)
                return NotFound(new { Message = "Associated job not found." });

            // Update status based on response
            applicantToUpdate.ApplicationStatus = accept ? ApplicationStatus.Accepted : ApplicationStatus.OfferRejected;

            try
            {
                await _applicantRepository.UpdateApplicantAsync(applicantToUpdate);

                // Notify the recruiter
                var responseMessage = accept ? "accepted" : "rejected";
                await _notificationService.CreateNotificationAsync(new NotificationDto
                {
                    UserId = job.PostedBy,
                    Message = $"{applicantToUpdate.Name} has {responseMessage} the job offer for '{job.JobTitle}'.",
                    Action = "OFFER_RESPONSE",
                    Route = $"/dashboard/jobs/{job.Id}/applicants"
                });

                var statusMessage = accept ? "Job offer accepted successfully!" : "Job offer rejected successfully.";
                return Ok(new { Message = statusMessage, Applicant = MapToDto(applicantToUpdate) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred during offer response.", Details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> DeleteApplication(long id)
        {
            var applicantToDelete = await _applicantRepository.GetApplicantByIdAsync(id);
            if (applicantToDelete == null)
                return NotFound(new { Message = "Application not found." });

            var job = await _jobRepository.GetJobByIdAsync(applicantToDelete.JobId);
            if (job == null)
                return NotFound(new { Message = "Associated job not found." });

            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            if (job.PostedBy != currentUserId)
                return Forbid();

            var deleted = await _applicantRepository.DeleteApplicantAsync(id);
            if (!deleted)
                return NotFound(new { Message = "Application not found." });

            return NoContent();
        }

        private ApplicantDto MapToDto(Applicant applicant)
        {
            return new ApplicantDto
            {
                Id = applicant.Id,
                ApplicantId = applicant.ApplicantId,
                Name = applicant.Name,
                Email = applicant.Email,
                Phone = applicant.Phone,
                Website = applicant.Website,
                ResumeBase64 = applicant.Resume != null ? Convert.ToBase64String(applicant.Resume) : null,
                CoverLetter = applicant.CoverLetter,
                TimeStamp = applicant.TimeStamp,
                ApplicationStatus = applicant.ApplicationStatus,
                InterviewTime = applicant.InterviewTime,
                JobId = applicant.JobId
            };
        }
    }
}
