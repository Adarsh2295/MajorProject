package com.jobportal.job_portal.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.jobportal.job_portal.DTO.NotificationStatus;
import com.jobportal.job_portal.Entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    public List<Notification> findByUserIdAndNotificationStatus(Long userId, NotificationStatus notificationStatus);

}
