package com.roima.HRMS.dtos.responce;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

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


