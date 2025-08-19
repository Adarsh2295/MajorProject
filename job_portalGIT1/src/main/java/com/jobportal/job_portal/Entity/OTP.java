package com.jobportal.job_portal.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "otp")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OTP {
    
    @Id
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String otp;
    
    @Column(name = "creation_time")
    private LocalDateTime creationTime;
}
