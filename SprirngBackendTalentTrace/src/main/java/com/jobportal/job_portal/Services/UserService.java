package com.jobportal.job_portal.Services;


import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.LoginDTO;
import com.jobportal.job_portal.DTO.ResponseDTO;
import com.jobportal.job_portal.DTO.UserDTO;
import com.jobportal.job_portal.Exceptions.JobPortalException;

import jakarta.mail.MessagingException;


@Service
public interface UserService {

    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;

    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;

    public Boolean sendOtp(String email) throws JobPortalException, MessagingException;

    public Boolean verifyOtp(String email, String otp) throws JobPortalException;

    public UserDTO getUserByEmail(String email) throws JobPortalException;

    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException;

}
