package com.jobportal.job_portal.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.NotificationDTO;
import com.jobportal.job_portal.Entity.Notification;
import com.jobportal.job_portal.Exceptions.JobPortalException;

@Service
public interface NotificationService {

    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;

    public List<Notification> getUnreadNotifications(Long UserId);

    public void readNotification(Long id) throws JobPortalException;
}
