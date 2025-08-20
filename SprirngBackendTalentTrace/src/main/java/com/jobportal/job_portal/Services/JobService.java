package com.jobportal.job_portal.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.ApplicantDTO;
import com.jobportal.job_portal.DTO.Application;
import com.jobportal.job_portal.DTO.JobDTO;
import com.jobportal.job_portal.Entity.User;
import com.jobportal.job_portal.Exceptions.JobPortalException;

@Service
public interface JobService {

    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException;

    public List<JobDTO> getAllJobs() throws JobPortalException;

    public JobDTO getJob(Long id) throws JobPortalException;

    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException;

    public List<JobDTO> getJobPostedBy(Long postedBy);

    public void changeAppStatus(Application application) throws JobPortalException;

}
