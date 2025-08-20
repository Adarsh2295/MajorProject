using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.API.Models.Entities
{
    [Table("profiles")]
    public class Profile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [StringLength(255)]
        public string? JobTitle { get; set; }

        [StringLength(255)]
        public string? Company { get; set; }

        [StringLength(255)]
        public string? Location { get; set; }

        public string? About { get; set; }

        // For simplicity, storing image as byte array. Consider cloud storage for production.
        public byte[]? Picture { get; set; }

        public long? TotalExp { get; set; } // Total experience in years/months

        [NotMapped] // Not mapped to DB, used for DTO conversion
        public List<string> Skills { get; set; } = new List<string>();

        [NotMapped] // Not mapped to DB, used for DTO conversion
        public List<Experience> Experiences { get; set; } = new List<Experience>();

        [NotMapped] // Not mapped to DB, used for DTO conversion
        public List<Certification> Certifications { get; set; } = new List<Certification>();

        [NotMapped] // Not mapped to DB, used for DTO conversion
        public List<long> SavedJobIds { get; set; } = new List<long>();
    }

    // Nested classes for complex types, typically stored as JSON or separate tables
    public class Experience
    {
        public string? ExpJobTitle { get; set; }
        public string? ExpCompany { get; set; }
        public string? Location { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Working { get; set; }
        public string? ExpDescription { get; set; }
    }

    public class Certification
    {
        public string? CertName { get; set; }
        public string? CertOrganization { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? CredentialUrl { get; set; }
    }
}
