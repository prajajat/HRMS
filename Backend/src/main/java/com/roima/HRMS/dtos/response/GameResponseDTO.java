package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.sql.Time;


@Data
public class GameResponseDTO {
    private Long gameId;

    private String gameName;

    private Time slotStartTime;

    private Time slotEndTime;

    private Integer slotDurationMinutes;

    private Integer maxPlayerPerSlot;

    private Integer maxSlotPerBooking;

    private boolean isPlayerInterested;

}
