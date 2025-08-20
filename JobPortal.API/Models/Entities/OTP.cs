using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.API.Models.Entities
{
    [Table("otp")]
    public class OTP
    {
        [Key]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string OtpCode { get; set; } = string.Empty;

        public DateTime CreationTime { get; set; }
    }
}
