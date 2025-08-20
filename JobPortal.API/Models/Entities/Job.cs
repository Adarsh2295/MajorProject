using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JobPortal.API.Models.Enums;

namespace JobPortal.API.Models.Entities
{
    [Table("jobs")]
    public class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [StringLength(255)]
        public string JobTitle { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Company { get; set; } = string.Empty;

        public string? About { get; set; }

        [StringLength(255)]
        public string? Experience { get; set; } // e.g., "0-2 years", "2-5 years"

        [StringLength(100)]
        public string? JobType { get; set; } // e.g., "Full-time", "Part-time", "Contract"

        [StringLength(255)]
        public string? Location { get; set; }

        public long? PackageOffered { get; set; } // Annual salary in currency units

        public DateTime PostTime { get; set; } = DateTime.UtcNow;

        public string? Description { get; set; }

        [StringLength(50)]
        public JobStatus JobStatus { get; set; }

        public long PostedBy { get; set; } // User ID of the recruiter/employer who posted the job

        [NotMapped]
        public List<string> Skills { get; set; } = new List<string>();
    }
}
