package com.roima.HRMS.dtos.request;

import lombok.Data;

import java.util.List;

@Data
public class GameInterestDTO {
    private Long userId;
    private List<Long> games;
}
