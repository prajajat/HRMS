package com.roima.HRMS.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TravelExpenceDTO {
    @PositiveOrZero
    private Long amount;
    @NotNull
    private LocalDateTime expenceDate;
    private String status;
    private String remark;
    private Long traveler;
    private List<Long> documentList;
}
