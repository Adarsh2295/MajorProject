using JobPortal.API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace JobPortal.API.Models.DTOs
{
    public class NotificationDto
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public long UserId { get; set; }

        [Required(ErrorMessage = "Message is required")]
        public string Message { get; set; } = string.Empty;

        public string? Action { get; set; }
        public string? Route { get; set; }
        public NotificationStatus NotificationStatus { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
