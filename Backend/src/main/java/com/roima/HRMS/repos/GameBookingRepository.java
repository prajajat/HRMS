package com.roima.HRMS.repos;

import com.roima.HRMS.entites.GameBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameBookingRepository  extends JpaRepository<GameBooking,Long> {
}
