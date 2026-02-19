package com.roima.HRMS.dtos.request;

import lombok.Data;

import java.sql.Time;
import java.time.LocalTime;

@Data
public class GameConfigDTO {
    private Long gameId;

    private LocalTime slotStartTime;

    private LocalTime slotEndTime;

    private Integer slotDurationMinutes;

    private Integer maxPlayerPerSlot;

    private Integer maxSlotPerBooking;

    private Boolean isOpenForWeekend;

    private Integer maxDayOfBookingAllow;
}
