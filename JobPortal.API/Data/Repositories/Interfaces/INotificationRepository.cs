using JobPortal.API.Models.Entities;

namespace JobPortal.API.Data.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task<Notification?> GetNotificationByIdAsync(long id);
        Task<IEnumerable<Notification>> GetNotificationsByUserIdAsync(long userId);
        Task AddNotificationAsync(Notification notification);
        Task UpdateNotificationAsync(Notification notification);
        Task DeleteNotificationAsync(long id);
        Task<bool> NotificationExistsAsync(long id);
    }
}
