using JobPortal.API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace JobPortal.API.Models.DTOs
{
    public class ApplicantDto
    {
        public long Id { get; set; }
        public long ApplicantId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }
        public string? Website { get; set; }
        public string? ResumeBase64 { get; set; } // For sending/receiving resume as base64 string
        public string? CoverLetter { get; set; }
        public DateTime TimeStamp { get; set; }
        public ApplicationStatus ApplicationStatus { get; set; }
        public DateTime? InterviewTime { get; set; }
        public long JobId { get; set; }
    }
}
