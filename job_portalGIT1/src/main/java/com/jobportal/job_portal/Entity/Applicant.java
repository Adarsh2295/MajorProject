package com.jobportal.job_portal.Entity;

import java.time.LocalDateTime;
import java.util.Base64;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import com.jobportal.job_portal.DTO.ApplicantDTO;
import com.jobportal.job_portal.DTO.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "applicants")
public class Applicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "applicant_id")
    private Long applicantId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String email;
    
    private String phone;
    
    private String website;
    
    @Lob
    private byte[] resume;
    
    @Column(name = "cover_letter", columnDefinition = "TEXT")
    private String coverLetter;
    
    @Column(name = "time_stamp")
    private LocalDateTime timeStamp;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "application_status")
    private ApplicationStatus applicationStatus;
    
    @Column(name = "interview_time")
    private LocalDateTime interviewTime;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    @JsonBackReference
    private Job job;

    public ApplicantDTO toDTO(){
        return new ApplicantDTO(this.applicantId,this.name,this.email,this.phone,this.website,this.resume!=null?Base64.getEncoder().encodeToString(this.resume):null,this.coverLetter,this.timeStamp,this.applicationStatus, this.interviewTime);
    }

}
