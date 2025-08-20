package com.jobportal.job_portal.DTO;

import java.time.LocalDateTime;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Certifications {

    private String name;
    private String organization;
    private LocalDateTime issueDate;
    private LocalDateTime expiryDate;
    private String credentialUrl;

}
