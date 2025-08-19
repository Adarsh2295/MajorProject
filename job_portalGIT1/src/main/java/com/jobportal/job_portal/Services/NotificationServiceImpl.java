package com.jobportal.job_portal.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.job_portal.DTO.NotificationDTO;
import com.jobportal.job_portal.DTO.NotificationStatus;
import com.jobportal.job_portal.Entity.Notification;
import com.jobportal.job_portal.Exceptions.JobPortalException;
import com.jobportal.job_portal.Repository.NotificationRepository;
import com.jobportal.job_portal.Utility.Utilities;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
        notificationDTO.setNotificationStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimeStamp(LocalDateTime.now());
        notificationDTO.setIsRead(false);
        Notification notification = new Notification(null, notificationDTO.getUserId(), notificationDTO.getMessage(), notificationDTO.getAction(), notificationDTO.getRoute(), notificationDTO.getNotificationStatus(), notificationDTO.getTimeStamp(), notificationDTO.getIsRead());
        notification = notificationRepository.save(notification);
        notificationDTO.setId(notification.getId());
    }

    @Override
    public List<Notification> getUnreadNotifications(Long UserId) {
        return notificationRepository.findByUserIdAndNotificationStatus(UserId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotification(Long id) throws JobPortalException {
       Notification notification = notificationRepository.findById(id).orElseThrow(() -> new JobPortalException("Notification not found"));
       notification.setNotificationStatus(NotificationStatus.READ);
       notification.setIsRead(true);
       notificationRepository.save(notification);
    }
    
}
