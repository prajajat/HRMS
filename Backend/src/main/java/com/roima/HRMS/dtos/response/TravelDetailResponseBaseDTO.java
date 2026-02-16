package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TravelDetailResponseBaseDTO {

    private Long tarvelDetailId;
    private String title;
    private String description;
    private Long maxAmoutPerDay;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private long createdId;
    private String createdName;
}


