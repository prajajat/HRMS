package com.roima.HRMS.dtos.responce;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TravelExpenseResponseDTO {

    private Long amount;
    private LocalDateTime expenseDate;
    private String status;
    private String remark;
    private Long travelerId;
    private List<DocDto> documents;
}

