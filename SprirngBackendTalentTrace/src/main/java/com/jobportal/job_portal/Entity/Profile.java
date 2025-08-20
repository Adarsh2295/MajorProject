package com.jobportal.job_portal.Entity;

import java.util.List;

import jakarta.persistence.*;

import com.jobportal.job_portal.DTO.Certifications;
import com.jobportal.job_portal.DTO.Experience;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(name = "job_title")
    private String jobTitle;
    
    private String company;
    
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String about;
    
    @Lob
    private byte[] picture;
    
    @Column(name = "total_exp")
    private Long totalExp;
    
    @ElementCollection
    @CollectionTable(name = "profile_skills", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "skill")
    private List<String> skills;
    
    @ElementCollection
    @CollectionTable(name = "profile_experience", joinColumns = @JoinColumn(name = "profile_id"))
    @AttributeOverrides({
        @AttributeOverride(name = "company", column = @Column(name = "exp_company")),
        @AttributeOverride(name = "jobTitle", column = @Column(name = "exp_job_title")),
        @AttributeOverride(name = "startDate", column = @Column(name = "start_date")),
        @AttributeOverride(name = "endDate", column = @Column(name = "end_date")),
        @AttributeOverride(name = "description", column = @Column(name = "exp_description", columnDefinition = "TEXT"))
    })
    private List<Experience> experience;
    
    @ElementCollection
    @CollectionTable(name = "profile_certifications", joinColumns = @JoinColumn(name = "profile_id"))
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "cert_name")),
        @AttributeOverride(name = "organization", column = @Column(name = "cert_organization")),
        @AttributeOverride(name = "issueDate", column = @Column(name = "issue_date")),
        @AttributeOverride(name = "expiryDate", column = @Column(name = "expiry_date")),
        @AttributeOverride(name = "credentialUrl", column = @Column(name = "credential_url"))
    })
    private List<Certifications> certifications;
    
    @ElementCollection
    @CollectionTable(name = "profile_saved_jobs", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "job_id")
    private List<Long> savedJobs;

}
