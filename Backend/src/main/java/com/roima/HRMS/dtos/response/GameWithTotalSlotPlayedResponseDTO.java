package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class GameWithTotalSlotPlayedResponseDTO {
    private String gameName;
    private Long totalSlotPlayed;
}
