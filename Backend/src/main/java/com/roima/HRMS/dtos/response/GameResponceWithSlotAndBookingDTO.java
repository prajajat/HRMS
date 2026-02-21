package com.roima.HRMS.dtos.response;

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


}
