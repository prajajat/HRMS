package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Game;
import com.roima.HRMS.entites.GameBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameBookingRepository  extends JpaRepository<GameBooking,Long> {
    List<GameBooking> findByGame(Game game);
}
