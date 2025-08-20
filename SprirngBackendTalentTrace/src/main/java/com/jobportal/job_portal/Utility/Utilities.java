package com.jobportal.job_portal.Utility;

import java.security.SecureRandom;
import org.springframework.stereotype.Component;

@Component
public class Utilities {

    public static String generateOtp() {
        StringBuilder otp = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}
