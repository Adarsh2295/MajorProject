using System.ComponentModel.DataAnnotations;

namespace JobPortal.API.Models.DTOs
{
    public class ProfileDto
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        public string? JobTitle { get; set; }
        public string? Company { get; set; }
        public string? Location { get; set; }
        public string? About { get; set; }
        public string? PictureBase64 { get; set; } // For sending/receiving image as base64 string
        public long? TotalExp { get; set; }
        public List<string> Skills { get; set; } = new List<string>();
        public List<ExperienceDto> Experiences { get; set; } = new List<ExperienceDto>();
        public List<CertificationDto> Certifications { get; set; } = new List<CertificationDto>();
        public List<long> SavedJobIds { get; set; } = new List<long>();
    }

    public class ExperienceDto
    {
        public string? ExpJobTitle { get; set; }
        public string? ExpCompany { get; set; }
        public string? Location { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Working { get; set; }
        public string? ExpDescription { get; set; }
    }

    public class CertificationDto
    {
        public string? CertName { get; set; }
        public string? CertOrganization { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? CredentialUrl { get; set; }
    }
}
