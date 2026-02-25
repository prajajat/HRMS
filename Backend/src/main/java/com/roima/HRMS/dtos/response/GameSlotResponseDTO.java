package com.roima.HRMS.dtos.response;

import com.roima.HRMS.components.StatusType;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
public class GameSlotResponseDTO {

    private Long gameSlotId;

    private Time slotStartTime;

    private Time slotEndTime;

    private Date date;

    private StatusType.BookingStatus slotStatus;

}
