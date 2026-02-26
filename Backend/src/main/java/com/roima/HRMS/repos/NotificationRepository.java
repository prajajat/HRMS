package com.roima.HRMS.repos;


import com.roima.HRMS.entities.Notification;
import com.roima.HRMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification,Long> {
 List<Notification> findByUser(User user);
 Long countByUserAndIsRead(User user,Boolean isRead);
}
