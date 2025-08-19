package com.jobportal.job_portal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.job_portal.Entity.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile,Long> {
    
}
