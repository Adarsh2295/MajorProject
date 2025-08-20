package com.jobportal.job_portal.JWT;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.jobportal.job_portal.DTO.UserDTO;
import com.jobportal.job_portal.Exceptions.JobPortalException;
import com.jobportal.job_portal.Services.UserService;

@Component
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO user = userService.getUserByEmail(email);
            return new CustomUserDetails(user.getId(), email,user.getName(), user.getPassword(),user.getProfileId(), user.getAccountType(), new ArrayList<>());
        } catch (JobPortalException e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
