package com.jobportal.job_portal.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
     private Long id;
    private Long userId;
    private String message;
    private String action;
    private String route;
    private NotificationStatus notificationStatus;
    private LocalDateTime timeStamp;
    private Boolean isRead = false;
}
