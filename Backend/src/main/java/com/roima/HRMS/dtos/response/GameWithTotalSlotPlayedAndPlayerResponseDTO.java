package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class GameWithTotalSlotPlayedAndPlayerResponseDTO  extends GameWithTotalSlotPlayedResponseDTO{
    private String playerName;
}
