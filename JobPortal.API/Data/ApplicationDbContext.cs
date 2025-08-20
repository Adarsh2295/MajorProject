using Microsoft.EntityFrameworkCore;
using JobPortal.API.Models.Entities;
using System.Text.Json; // For serializing complex types

namespace JobPortal.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<OTP> OTPs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Configure Profile entity
            modelBuilder.Entity<Profile>()
                .HasIndex(p => p.Email)
                .IsUnique();

            // Configure one-to-one relationship between User and Profile
            modelBuilder.Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne()
                .HasForeignKey<User>(u => u.ProfileId)
                .IsRequired(false) // ProfileId can be null initially
                .OnDelete(DeleteBehavior.SetNull); // If profile is deleted, set ProfileId in User to null

            // Configure complex types for Profile (Skills, Experiences, Certifications, SavedJobIds)
            // These are typically stored as JSON strings in a single column or in separate join tables.
            // For simplicity, we'll use JSON serialization for now.
            // If these need to be queried, separate tables are recommended.

            // Example for Skills (if stored as a string in DB, e.g., comma-separated)
            // If you want to store skills as a JSON array in a single column:
            modelBuilder.Entity<Profile>()
                .Property(p => p.Skills)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>()
                )
                .HasColumnType("nvarchar(max)"); // Changed from 'json' for SQL Server compatibility

            modelBuilder.Entity<Profile>()
                .Property(p => p.Experiences)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<Experience>>(v, (JsonSerializerOptions?)null) ?? new List<Experience>()
                )
                .HasColumnType("nvarchar(max)");

            modelBuilder.Entity<Profile>()
                .Property(p => p.Certifications)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<Certification>>(v, (JsonSerializerOptions?)null) ?? new List<Certification>()
                )
                .HasColumnType("nvarchar(max)");

            modelBuilder.Entity<Profile>()
                .Property(p => p.SavedJobIds)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<long>>(v, (JsonSerializerOptions?)null) ?? new List<long>()
                )
                .HasColumnType("nvarchar(max)");

            // Configure Job entity
            modelBuilder.Entity<Job>()
                .Property(j => j.Skills)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                    v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>()
                )
                .HasColumnType("nvarchar(max)");

            // Configure Applicant entity
            modelBuilder.Entity<Applicant>()
                .HasOne(a => a.Job)
                .WithMany()
                .HasForeignKey(a => a.JobId)
                .OnDelete(DeleteBehavior.Cascade); // If job is deleted, delete associated applicants
        }
    }
}
