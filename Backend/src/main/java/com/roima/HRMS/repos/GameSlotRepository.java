package com.roima.HRMS.repos;

import com.roima.HRMS.components.StatusType;
import com.roima.HRMS.entities.Game;
import com.roima.HRMS.entities.GameSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface GameSlotRepository  extends JpaRepository<GameSlot,Long> {
    List<GameSlot> findBySlotStatus(StatusType.BookingStatus slotStatus);
    List<GameSlot> findByDateGreaterThanEqualAndDateLessThanEqualAndGame(Date startDate, Date endDate, Game game);

    @Query(value = "select * from game_slots" +
            "  where  " +
            " date <:date or " +
            "          (date = :date and  slot_start_time <  CAST(:slotStartTime as TIME )" +
            ")",nativeQuery = true)
    List<GameSlot> findBySlotStatusAndSlotStartTimeBefore(@Param("slotStartTime") Time slotStartTime, @Param("date") Date date);

   // List<GameSlot> findBySlotStatusAndSlotStartTimeBefore(StatusType.BookingStatus slotStatus,Time slotStartTime);
}
