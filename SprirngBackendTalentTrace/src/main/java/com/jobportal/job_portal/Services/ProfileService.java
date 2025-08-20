package com.jobportal.job_portal.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.ProfileDTO;
import com.jobportal.job_portal.Exceptions.JobPortalException;

@Service
public interface ProfileService {

    public Long createProfile(String email, String name) throws JobPortalException;
    public ProfileDTO getProfile(Long id) throws JobPortalException;
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException;
    public List<ProfileDTO> getAllProfile();


    
}
