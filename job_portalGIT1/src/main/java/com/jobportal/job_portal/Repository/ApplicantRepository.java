package com.jobportal.job_portal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.job_portal.Entity.Applicant;
import java.util.List;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    
    List<Applicant> findByJob_Id(Long jobId);
    List<Applicant> findByApplicantId(Long applicantId);
    
}
