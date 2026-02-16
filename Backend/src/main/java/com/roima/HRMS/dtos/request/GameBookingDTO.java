package com.roima.HRMS.dtos.request;

import lombok.Data;

import java.util.List;

@Data
public class GameBookingDTO {
    private Long createdBy;
    private Long gameId;
    private List<Long> gameSlots;
    private List<Long> AllPlayers;
}
