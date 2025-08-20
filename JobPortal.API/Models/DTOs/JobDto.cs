using JobPortal.API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace JobPortal.API.Models.DTOs
{
    public class JobDto
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Job title is required")]
        public string JobTitle { get; set; } = string.Empty;

        [Required(ErrorMessage = "Company is required")]
        public string Company { get; set; } = string.Empty;

        public string? About { get; set; }
        public string? Experience { get; set; }
        public string? JobType { get; set; }
        public string? Location { get; set; }
        public long? PackageOffered { get; set; }
        public DateTime PostTime { get; set; }
        public string? Description { get; set; }
        public JobStatus JobStatus { get; set; }
        public long PostedBy { get; set; }
        public List<string> Skills { get; set; } = new List<string>();
    }
}
