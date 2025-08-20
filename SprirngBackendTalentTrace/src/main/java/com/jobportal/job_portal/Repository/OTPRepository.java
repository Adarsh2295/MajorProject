package com.jobportal.job_portal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.job_portal.Entity.OTP;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface OTPRepository extends JpaRepository<OTP,String> {

    List<OTP> findByCreationTimeBefore(LocalDateTime otpGeneratedAt);
    
}
