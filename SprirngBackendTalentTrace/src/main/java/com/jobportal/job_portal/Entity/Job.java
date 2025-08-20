package com.jobportal.job_portal.Entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.jobportal.job_portal.DTO.JobStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "job_title", nullable = false)
    private String jobTitle;
    
    @Column(nullable = false)
    private String company;
    
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Applicant> applicants;
    
    @Column(columnDefinition = "TEXT")
    private String about;
    
    private String experience;
    
    @Column(name = "job_type")
    private String jobType;
    
    private String location;
    
    @Column(name = "package_offered")
    private Long packageOffered;
    
    @Column(name = "post_time")
    private LocalDateTime postTime;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ElementCollection
    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private List<String> skillsRequired;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "job_status")
    private JobStatus jobStatus;
    
    @Column(name = "posted_by")
    private long postedBy;
    
    @Column(name = "category_id", nullable = true)
    private Long categoryId; // No foreign key constraint
    
    @Column(name = "recruiter_id", nullable = true)
    private Long recruiterId;
}
