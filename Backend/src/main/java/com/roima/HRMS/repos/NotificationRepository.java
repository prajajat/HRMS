package com.roima.HRMS.repos;


import com.roima.HRMS.entites.GameSlot;
import com.roima.HRMS.entites.Notification;
import com.roima.HRMS.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification,Long> {
 List<Notification> findByUser(User user);
}
