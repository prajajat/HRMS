package com.roima.HRMS.repos;

import com.roima.HRMS.components.StatusType;
import com.roima.HRMS.entities.Game;
import com.roima.HRMS.entities.GameSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface GameSlotRepository  extends JpaRepository<GameSlot,Long> {
    List<GameSlot> findBySlotStatus(StatusType.BookingStatus slotStatus);
    List<GameSlot> findByDateGreaterThanEqualAndDateLessThanEqualAndGame(Date startDate, Date endDate, Game game);

}
