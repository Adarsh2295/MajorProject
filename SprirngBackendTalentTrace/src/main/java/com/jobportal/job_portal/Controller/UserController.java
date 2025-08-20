package com.jobportal.job_portal.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.job_portal.DTO.LoginDTO;
import com.jobportal.job_portal.DTO.ResponseDTO;
import com.jobportal.job_portal.DTO.UserDTO;
import com.jobportal.job_portal.Exceptions.JobPortalException;
import com.jobportal.job_portal.Services.UserService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;



@RestController
@CrossOrigin
@Validated
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    // Add your controller methods here


    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws JobPortalException {
        userDTO = userService.registerUser(userDTO);
        return new ResponseEntity<>(userDTO,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
        return new ResponseEntity<>(userService.loginUser(loginDTO),HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
        return new ResponseEntity<>(userService.changePassword(loginDTO),HttpStatus.OK);
    }

    @PostMapping("/send-otp/{email}")
    public ResponseEntity<ResponseDTO> sendOtp(@PathVariable @Email(message = "Incorrect Email") String email) throws JobPortalException, MessagingException {
         userService.sendOtp(email);
         return new ResponseEntity<>(new ResponseDTO("OTP sent successfully"),HttpStatus.OK);
    }

    @GetMapping("/verify-otp/{email}/{otp}")
    public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable @Email(message = "Incorrect Email") String email, @PathVariable @Pattern(regexp = "^\\d{6}$",message = "Invalid OTP") String otp) throws JobPortalException{
        userService.verifyOtp(email, otp);
        return new ResponseEntity<>(new ResponseDTO("OTP has been verified."),HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<UserDTO> getCurrentUser() throws JobPortalException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserDTO userDTO = userService.getUserByEmail(email);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    
    
    

}