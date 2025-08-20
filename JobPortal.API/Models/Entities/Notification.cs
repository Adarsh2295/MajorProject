using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JobPortal.API.Models.Enums;

namespace JobPortal.API.Models.Entities
{
    [Table("notifications")]
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        public long UserId { get; set; }

        [Required]
        public string Message { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Action { get; set; } // e.g., "JOB_APPLIED", "PROFILE_UPDATED"

        [StringLength(255)]
        public string? Route { get; set; } // e.g., "/dashboard/my-applications"

        [StringLength(50)]
        public NotificationStatus NotificationStatus { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.UtcNow;
    }
}
