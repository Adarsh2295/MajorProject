package com.jobportal.job_portal.Services;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.ProfileDTO;
import com.jobportal.job_portal.Entity.Profile;
import com.jobportal.job_portal.Exceptions.JobPortalException;
import com.jobportal.job_portal.Repository.ProfileRepository;
import com.jobportal.job_portal.Utility.Utilities;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Long createProfile(String email, String name) throws JobPortalException {
        Profile profile = new Profile();
        profile.setName(name);
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperience(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profile.setSavedJobs(new ArrayList<>());
        profile = profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
       Profile profile =  profileRepository.findById(id).orElseThrow(()-> new JobPortalException("profile.not.found"));
       ProfileDTO profileDTO = new ProfileDTO(profile.getId(),profile.getName(),profile.getEmail(), profile.getJobTitle(), profile.getCompany(), profile.getLocation(), profile.getAbout(),profile.getPicture()!=null?Base64.getEncoder().encodeToString(profile.getPicture()):null,profile.getTotalExp(), profile.getSkills(), profile.getExperience(), profile.getCertifications(), profile.getSavedJobs());
       return profileDTO;
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
        Profile profile = profileRepository.findById(profileDTO.getId()).orElseThrow(()-> new JobPortalException("profile.not.found"));
        profile.setName(profileDTO.getName());
        profile.setEmail(profileDTO.getEmail());
        profile.setJobTitle(profileDTO.getJobTitle());
        profile.setCompany(profileDTO.getCompany());
        profile.setLocation(profileDTO.getLocation());
        profile.setAbout(profileDTO.getAbout());
        profile.setPicture(profileDTO.getPicture()!=null?Base64.getDecoder().decode(profileDTO.getPicture()):null);
        profile.setTotalExp(profileDTO.getTotalExp());
        profile.setSkills(profileDTO.getSkills());
        profile.setExperience(profileDTO.getExperience());
        profile.setCertifications(profileDTO.getCertifications());
        profile.setSavedJobs(profileDTO.getSavedJobs());
        profileRepository.save(profile);

        ProfileDTO profileDTO2 = new ProfileDTO(profile.getId(),profile.getName(),profile.getEmail(), profile.getJobTitle(), profile.getCompany(), profile.getLocation(), profile.getAbout(),profile.getPicture()!=null?Base64.getEncoder().encodeToString(profile.getPicture()):null, profile.getTotalExp(),profile.getSkills(), profile.getExperience(), profile.getCertifications(),profile.getSavedJobs());
        
        return profileDTO2;
    }

    @Override
    public List<ProfileDTO> getAllProfile() {
        List<Profile> profiles = profileRepository.findAll();
        List<ProfileDTO> profileDTOs = new ArrayList<>();
        for (Profile profile : profiles) {
            ProfileDTO profileDTO2 = new ProfileDTO(profile.getId(),profile.getName(),profile.getEmail(), profile.getJobTitle(), profile.getCompany(), profile.getLocation(), profile.getAbout(),profile.getPicture()!=null?Base64.getEncoder().encodeToString(profile.getPicture()):null, profile.getTotalExp(),profile.getSkills(), profile.getExperience(), profile.getCertifications(),profile.getSavedJobs());
            profileDTOs.add(profileDTO2);
        }
        return profileDTOs;
    }
    
}
