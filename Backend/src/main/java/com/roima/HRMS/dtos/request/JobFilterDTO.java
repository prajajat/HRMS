package com.roima.HRMS.dtos.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobFilterDTO {
    private Boolean status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long createdById;
    private String search;
}