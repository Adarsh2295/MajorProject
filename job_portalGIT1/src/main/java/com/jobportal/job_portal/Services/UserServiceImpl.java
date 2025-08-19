package com.jobportal.job_portal.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.LoginDTO;
import com.jobportal.job_portal.DTO.NotificationDTO;
import com.jobportal.job_portal.DTO.ResponseDTO;
import com.jobportal.job_portal.DTO.UserDTO;
import com.jobportal.job_portal.Entity.OTP;
import com.jobportal.job_portal.Entity.User;
import com.jobportal.job_portal.Exceptions.JobPortalException;
import com.jobportal.job_portal.Repository.OTPRepository;
import com.jobportal.job_portal.Repository.UserRepository;
import com.jobportal.job_portal.Utility.Data;
import com.jobportal.job_portal.Utility.Utilities;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private NotificationService notificationService;

    @Override
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {

        Optional<User> option = userRepository.findByEmail(userDTO.getEmail());
        if(option.isPresent()) throw new JobPortalException("user.present");
        userDTO.setProfileId(profileService.createProfile(userDTO.getEmail(), userDTO.getName()));
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = new User(null, userDTO.getName(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getAccountType(),userDTO.getProfileId());
        user = userRepository.save(user);
        userDTO.setId(user.getId());
        UserDTO userDTO2 = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getAccountType(),user.getProfileId());
        return userDTO2;
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException {
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()-> new JobPortalException("user.not.present"));
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new JobPortalException("password.incorrect");
        }
        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(),user.getAccountType(),user.getProfileId());
        return userDTO;
    }

    @Override
    public Boolean sendOtp(String email) throws JobPortalException, MessagingException {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new JobPortalException("user.not.found"));
        MimeMessage mm = javaMailSender.createMimeMessage();
        MimeMessageHelper mh = new MimeMessageHelper(mm,true);
        mh.setTo(email);
        mh.setSubject("Your OTP Code");
        String otp = Utilities.generateOtp();
        OTP otp1 = new OTP(email, otp, LocalDateTime.now());
        otp1 = otpRepository.save(otp1);
        mh.setText(Data.getMessage(otp,user),true);
        javaMailSender.send(mm);
        return true;
    }

    @Override
    public Boolean verifyOtp(String email, String otp) throws JobPortalException {
        OTP otpEntity = otpRepository.findById(email).orElseThrow(()->new JobPortalException("otp.not.found"));
        if(!otpEntity.getOtp().equals(otp)) throw new JobPortalException("otp.incorrect");
        return true;
    }

    @Override
    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException {
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()-> new JobPortalException("user.not.found"));
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setUserId(user.getId());
        notificationDTO.setMessage("Password Reset Successfully");
        notificationDTO.setAction("Password Reset");
        notificationService.sendNotification(notificationDTO);
        return new ResponseDTO("Password changed successfully");
    }

    @Scheduled(fixedRate = 60000)
    public void removeExpiredOTPs(){
        LocalDateTime exp = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOtps = otpRepository.findByCreationTimeBefore(exp);
        otpRepository.deleteAll(expiredOtps);
    }

    @Override
    public UserDTO getUserByEmail(String email) throws JobPortalException {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new JobPortalException("user.not.found"));
        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(),user.getAccountType(),user.getProfileId());
        return userDTO;
    }
}
