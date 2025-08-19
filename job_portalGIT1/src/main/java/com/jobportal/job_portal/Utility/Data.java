package com.jobportal.job_portal.Utility;

import com.jobportal.job_portal.Entity.User;

public class Data {

    public static String getMessage(String otp, User user){
          return "<!DOCTYPE html>"
    + "<html>"
    + "<head>"
    + "<meta charset='UTF-8'>"
    + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
    + "<title>OTP Verification</title>"
    + "<style>"
    + "body { font-family: 'Arial', sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }"
    + ".container { max-width: 500px; margin: 40px auto; background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); text-align: center; border-top: 5px solid #2563eb; }"
    + ".header { font-size: 22px; font-weight: bold; color: #333; margin-bottom: 15px; }"
    + ".message { font-size: 16px; color: #555; margin-bottom: 20px; line-height: 1.6; }"
    + ".otp { font-size: 30px; font-weight: bold; background: linear-gradient(45deg, #2563eb, #4f46e5); padding: 14px 28px; display: inline-block; border-radius: 8px; color: #ffffff; letter-spacing: 5px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); }"
    + ".note { font-size: 14px; color: #888; margin-top: 20px; }"
    + ".footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 10px; }"
    + "</style>"
    + "</head>"
    + "<body>"
    + "<div class='container'>"
    + "<div class='header'>🔐 Secure One-Time Password</div>"
    + "<p class='message'>Hello "+user.getName()+",</p>"
    + "<p class='message'>Use the OTP below to proceed with your action. This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>"
    + "<p class='otp'>"+otp+"</p>"  // Replace dynamically in Java
    + "<p class='note'>If you did not request this OTP, please ignore this email.</p>"
    + "<p class='footer'>This is an automated email. Please do not reply.<br>© 2025 JobSpark. All rights reserved.</p>"
    + "</div>"
    
    + "</body>"
    + "</html>";
      
      
    }
    
}
