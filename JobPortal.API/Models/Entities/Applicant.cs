using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JobPortal.API.Models.Enums;

namespace JobPortal.API.Models.Entities
{
    [Table("applicants")]
    public class Applicant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public long ApplicantId { get; set; } // User ID of the applicant

        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(255)]
        public string? Website { get; set; }

        // For simplicity, storing resume as byte array. Consider cloud storage for production.
        public byte[]? Resume { get; set; }

        public string? CoverLetter { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.UtcNow;

        [StringLength(50)]
        public ApplicationStatus ApplicationStatus { get; set; }

        public DateTime? InterviewTime { get; set; }

        public long JobId { get; set; }

        [ForeignKey("JobId")]
        public Job? Job { get; set; }
    }
}
