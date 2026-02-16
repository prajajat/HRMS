package com.roima.HRMS.dtos.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
public class TravelDetailDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @PositiveOrZero
    private Long maxAmoutPerDay;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @NotNull
    private Long creadtedBy;

}
