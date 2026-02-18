package com.roima.HRMS.dtos.response;

import com.roima.HRMS.componets.StatusType;
import com.roima.HRMS.entites.Game;
import com.roima.HRMS.entites.GameBooking;
import com.roima.HRMS.entites.User;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Data
public class GameSlotResponseDTO {

    private Long gameSlotId;

    private Time slotStartTime;

    private Time slotEndTime;

    private Date date;

    private StatusType.BookingStatus slotStatus;

}
