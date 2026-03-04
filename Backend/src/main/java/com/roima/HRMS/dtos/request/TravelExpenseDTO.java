package com.roima.HRMS.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TravelExpenseDTO {
    @PositiveOrZero
    private Double amount;
    @NotNull
    private LocalDateTime expenseDate;

    private Long traveler;
    private List<String> fileNameList;
    private String ownerType;

    private String documentType;

}
