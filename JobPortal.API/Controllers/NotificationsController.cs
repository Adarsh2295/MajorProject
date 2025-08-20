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
    [Authorize] // Requires authentication for all endpoints in this controller
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
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

        [HttpGet("my-notifications")]
        public async Task<IActionResult> GetMyNotifications()
        {
            var currentUserId = GetCurrentUserId();
            var notifications = await _notificationService.GetNotificationsByUserIdAsync(currentUserId);
            return Ok(notifications);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotificationById(long id)
        {
            var notification = await _notificationService.GetNotificationByIdAsync(id);
            if (notification == null)
            {
                return NotFound(new { Message = "Notification not found." });
            }

            // Authorization: Only the owner of the notification or an admin can view it
            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            if (notification.UserId != currentUserId)
            {
                return Forbid();
            }

            return Ok(notification);
        }

        [HttpPut("{id}/mark-as-read")]
        public async Task<IActionResult> MarkNotificationAsRead(long id)
        {
            var notification = await _notificationService.GetNotificationByIdAsync(id);
            if (notification == null)
            {
                return NotFound(new { Message = "Notification not found." });
            }

            // Authorization: Only the owner of the notification or an admin can mark it as read
            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            if (notification.UserId != currentUserId)
            {
                return Forbid();
            }

            try
            {
                var updatedNotification = await _notificationService.MarkNotificationAsReadAsync(id);
                return Ok(new { Message = "Notification marked as read.", Notification = updatedNotification });
            }
            catch (JobPortalException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while marking notification as read.", Details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(long id)
        {
            var notification = await _notificationService.GetNotificationByIdAsync(id);
            if (notification == null)
            {
                return NotFound(new { Message = "Notification not found." });
            }

            // Authorization: Only the owner of the notification or an admin can delete it
            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            if (notification.UserId != currentUserId)
            {
                return Forbid();
            }

            var deleted = await _notificationService.DeleteNotificationAsync(id);
            if (!deleted)
            {
                return NotFound(new { Message = "Notification not found." });
            }
            return NoContent();
        }
    }
}
