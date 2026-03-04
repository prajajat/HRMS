package com.roima.HRMS.dtos.response;

import com.roima.HRMS.entities.GameSlot;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

import java.util.List;

@Data
public class GameResponceWithSlotAndBookingDTO extends GameResponseDTO {
    private Date cycleStartDate;
    private Date cycleEndDate;
    private Boolean isOpenForWeekend;

    private List<GameBookingResponseDTO> gameBookings;
    private List<GameSlotResponseDTO> gameSlots;
    private GameSlotResponseDTO upcomingSlot;
    private List<UserResponceBaseDTO> upcomingPlayers;
    private List<GameWithTotalSlotPlayedAndPlayerResponseDTO> mostPlayed;


}
