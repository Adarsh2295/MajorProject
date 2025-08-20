using JobPortal.API.Models.DTOs;

namespace JobPortal.API.Services.Interfaces
{
    public interface INotificationService
    {
        Task<NotificationDto?> CreateNotificationAsync(NotificationDto notificationDto);
        Task<NotificationDto?> GetNotificationByIdAsync(long id);
        Task<IEnumerable<NotificationDto>> GetNotificationsByUserIdAsync(long userId);
        Task<NotificationDto?> MarkNotificationAsReadAsync(long id);
        Task<bool> DeleteNotificationAsync(long id);
    }
}
