using JobPortal.API.Data.Repositories.Interfaces;
using JobPortal.API.Exceptions;
using JobPortal.API.Models.DTOs;
using JobPortal.API.Models.Entities;
using JobPortal.API.Models.Enums;
using JobPortal.API.Services.Interfaces;

namespace JobPortal.API.Services.Implementations
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<NotificationDto?> CreateNotificationAsync(NotificationDto notificationDto)
        {
            var notification = new Notification
            {
                UserId = notificationDto.UserId,
                Message = notificationDto.Message,
                Action = notificationDto.Action,
                Route = notificationDto.Route,
                NotificationStatus = NotificationStatus.Unread, // New notifications are unread by default
                TimeStamp = DateTime.UtcNow
            };

            await _notificationRepository.AddNotificationAsync(notification);
            return MapToDto(notification);
        }

        public async Task<NotificationDto?> GetNotificationByIdAsync(long id)
        {
            var notification = await _notificationRepository.GetNotificationByIdAsync(id);
            return notification == null ? null : MapToDto(notification);
        }

        public async Task<IEnumerable<NotificationDto>> GetNotificationsByUserIdAsync(long userId)
        {
            var notifications = await _notificationRepository.GetNotificationsByUserIdAsync(userId);
            return notifications.Select(n => MapToDto(n));
        }

        public async Task<NotificationDto?> MarkNotificationAsReadAsync(long id)
        {
            var notificationToUpdate = await _notificationRepository.GetNotificationByIdAsync(id);
            if (notificationToUpdate == null)
            {
                throw new JobPortalException("Notification not found.");
            }

            notificationToUpdate.NotificationStatus = NotificationStatus.Read;
            await _notificationRepository.UpdateNotificationAsync(notificationToUpdate);
            return MapToDto(notificationToUpdate);
        }

        public async Task<bool> DeleteNotificationAsync(long id)
        {
            var notification = await _notificationRepository.GetNotificationByIdAsync(id);
            if (notification == null)
            {
                return false;
            }
            await _notificationRepository.DeleteNotificationAsync(id);
            return true;
        }

        private NotificationDto MapToDto(Notification notification)
        {
            return new NotificationDto
            {
                Id = notification.Id,
                UserId = notification.UserId,
                Message = notification.Message,
                Action = notification.Action,
                Route = notification.Route,
                NotificationStatus = notification.NotificationStatus,
                TimeStamp = notification.TimeStamp
            };
        }
    }
}
