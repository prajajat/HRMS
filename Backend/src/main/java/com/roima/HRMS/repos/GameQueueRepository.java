package com.roima.HRMS.repos;

import com.roima.HRMS.entities.Game;
import com.roima.HRMS.entities.GameBooking;
import com.roima.HRMS.entities.GameQueue;
import com.roima.HRMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameQueueRepository  extends JpaRepository<GameQueue,Long> {
    List<GameQueue> findByGameAndIsActive(Game game,Boolean isActive);
    List<GameQueue> findByGameBooking(GameBooking gameBooking);
    List<GameQueue> findAllByPlayer(User player);
    Boolean existsByGameAndPlayer(Game game,User user);
}
