package com.jobportal.job_portal.Services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.AccountType;
import com.jobportal.job_portal.DTO.ApplicantDTO;
import com.jobportal.job_portal.DTO.Application;
import com.jobportal.job_portal.DTO.ApplicationStatus;
import com.jobportal.job_portal.DTO.JobDTO;
import com.jobportal.job_portal.DTO.JobStatus;
import com.jobportal.job_portal.DTO.NotificationDTO;
import com.jobportal.job_portal.Entity.Applicant;
import com.jobportal.job_portal.Entity.Job;
import com.jobportal.job_portal.Entity.User;
import com.jobportal.job_portal.Exceptions.JobPortalException;
import com.jobportal.job_portal.Repository.ApplicantRepository;
import com.jobportal.job_portal.Repository.JobRepository;
import com.jobportal.job_portal.Utility.Utilities;

@Service
public class JobServiceImpl implements JobService  {

    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private ApplicantRepository applicantRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
      if(jobDTO.getId()==null || jobDTO.getId()==0){
        jobDTO.setPostTime(LocalDateTime.now());
        // Set default categoryId if null
        if(jobDTO.getCategoryId() == null) {
            jobDTO.setCategoryId(1L);
        }
        // Set recruiterId to postedBy if null
        if(jobDTO.getRecruiterId() == null) {
            jobDTO.setRecruiterId(jobDTO.getPostedBy());
        }
        Job job = new Job(null, jobDTO.getJobTitle(), jobDTO.getCompany(), null, jobDTO.getAbout(), jobDTO.getExperience(), jobDTO.getJobType(), jobDTO.getLocation(), jobDTO.getPackageOffered(), jobDTO.getPostTime(), jobDTO.getDescription(), jobDTO.getSkillsRequired(), jobDTO.getJobStatus(), jobDTO.getPostedBy(), jobDTO.getCategoryId(), jobDTO.getRecruiterId());
        job = jobRepository.save(job);
        jobDTO.setId(job.getId());
        NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Job Posted");
            notificationDTO.setMessage("Job Posted Successfully for "+jobDTO.getJobTitle()+" at "+ jobDTO.getCompany());
            notificationDTO.setRoute("/posted-job/"+jobDTO.getId());
            notificationDTO.setUserId(jobDTO.getPostedBy());
            notificationService.sendNotification(notificationDTO);
      }
      else{
        Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(()-> new JobPortalException("job.not.found"));
        if(job.getJobStatus().equals(JobStatus.DRAFT)||job.getJobStatus().equals(JobStatus.CLOSED)){
          jobDTO.setPostTime(LocalDateTime.now());
        }
        // Set recruiterId to postedBy if null
        if(jobDTO.getRecruiterId() == null) {
            jobDTO.setRecruiterId(jobDTO.getPostedBy());
        }
      }
        Job job = new Job(jobDTO.getId(), jobDTO.getJobTitle(), jobDTO.getCompany(), null, jobDTO.getAbout(), jobDTO.getExperience(), jobDTO.getJobType(), jobDTO.getLocation(), jobDTO.getPackageOffered(), jobDTO.getPostTime(), jobDTO.getDescription(), jobDTO.getSkillsRequired(), jobDTO.getJobStatus(), jobDTO.getPostedBy(), jobDTO.getCategoryId(), jobDTO.getRecruiterId());
        jobRepository.save(job);
        List<ApplicantDTO> applicantDTOs = applicantRepository.findByJob_Id(job.getId()).stream().map(x -> x.toDTO()).toList();
        JobDTO jobDTO2 =new JobDTO(job.getId(), job.getJobTitle(), job.getCompany(), applicantDTOs, job.getAbout(), job.getExperience(), job.getJobType(), job.getLocation(), job.getPackageOffered(), job.getPostTime(), job.getDescription(), job.getSkillsRequired(), job.getJobStatus(), job.getPostedBy(), job.getCategoryId(), job.getRecruiterId());
        return jobDTO2;
    }

    @Override
    public List<JobDTO> getAllJobs() throws JobPortalException {

      List<Job> jobs = jobRepository.findAll();
      List<JobDTO> jobDTOs = new ArrayList<>();
      for(Job job : jobs){
        List<ApplicantDTO> applicantDTOs = applicantRepository.findByJob_Id(job.getId()).stream().map(x -> x.toDTO()).toList();
        JobDTO jobDTO2 =new JobDTO(job.getId(), job.getJobTitle(), job.getCompany(), applicantDTOs, job.getAbout(), job.getExperience(), job.getJobType(), job.getLocation(), job.getPackageOffered(), job.getPostTime(), job.getDescription(), job.getSkillsRequired(), job.getJobStatus(), job.getPostedBy(), job.getCategoryId(), job.getRecruiterId());
        jobDTOs.add(jobDTO2);
      }
      return jobDTOs;
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
      Job job = jobRepository.findById(id).orElseThrow(()->new JobPortalException("job.not.found"));
      List<ApplicantDTO> applicantDTOs = applicantRepository.findByJob_Id(job.getId()).stream().map(x -> x.toDTO()).toList();
      JobDTO jobDTO2 =new JobDTO(job.getId(), job.getJobTitle(), job.getCompany(), applicantDTOs, job.getAbout(), job.getExperience(), job.getJobType(), job.getLocation(), job.getPackageOffered(), job.getPostTime(), job.getDescription(), job.getSkillsRequired(), job.getJobStatus(), job.getPostedBy(), job.getCategoryId(), job.getRecruiterId());
      return jobDTO2;
    }

    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
      Job job = jobRepository.findById(id).orElseThrow(()->new JobPortalException("job.not.found"));
      
      // Check if already applied
      List<Applicant> existingApplications = applicantRepository.findByJob_Id(id).stream()
        .filter(x -> x.getApplicantId().equals(applicantDTO.getApplicantId()))
        .toList();
      if(!existingApplications.isEmpty()) {
        throw new JobPortalException("job.applied.already");
      }
      
      applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
      applicantDTO.setTimeStamp(LocalDateTime.now());
      Applicant applicant = applicantDTO.toEntity();
      applicant.setJob(job);
      applicantRepository.save(applicant);
    }

    @Override
    public List<JobDTO> getJobPostedBy(Long postedBy) {
      List<Job> jobs = jobRepository.findByPostedBy(postedBy);
      List<JobDTO> jobDTOs = new ArrayList<>();
      for(Job job : jobs){
        List<ApplicantDTO> applicantDTOs = applicantRepository.findByJob_Id(job.getId()).stream().map(x -> x.toDTO()).toList();
        JobDTO jobDTO2 =new JobDTO(job.getId(), job.getJobTitle(), job.getCompany(), applicantDTOs, job.getAbout(), job.getExperience(), job.getJobType(), job.getLocation(), job.getPackageOffered(), job.getPostTime(), job.getDescription(), job.getSkillsRequired(), job.getJobStatus(), job.getPostedBy(), job.getCategoryId(), job.getRecruiterId());
        jobDTOs.add(jobDTO2);
      }
      return jobDTOs;
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
      Job job = jobRepository.findById(application.getId()).orElseThrow(()->new JobPortalException("job.not.found"));
      
      List<Applicant> applicants = applicantRepository.findByJob_Id(application.getId());
      for(Applicant applicant : applicants) {
        if(application.getApplicantId().equals(applicant.getApplicantId())){
          applicant.setApplicationStatus(application.getApplicationStatus());
          if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)){
            applicant.setInterviewTime(application.getInterviewTime());
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Interview Scheduled");
            notificationDTO.setMessage("Interview Scheduled for job id "+application.getId());
            notificationDTO.setRoute("/job-history");
            notificationDTO.setUserId(application.getApplicantId());
            try {
              notificationService.sendNotification(notificationDTO);
            } catch (JobPortalException e) {
              e.printStackTrace();
            }
          }
          applicantRepository.save(applicant);
          break;
        }
      }
    }
}
