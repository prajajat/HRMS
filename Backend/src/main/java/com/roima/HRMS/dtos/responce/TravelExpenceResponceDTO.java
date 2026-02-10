package com.roima.HRMS.dtos.responce;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TravelExpenceResponceDTO {

    private Long amount;
    private LocalDateTime expenceDate;
    private String status;
    private String remark;
    private Long travelerId;
    private List<Long> documenIds;
}

