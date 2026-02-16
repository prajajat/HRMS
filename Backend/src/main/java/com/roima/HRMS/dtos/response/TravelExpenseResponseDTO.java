package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TravelExpenseResponseDTO {
    private Long travelExpensesId;
    private Long amount;
    private LocalDateTime expenseDate;
    private String status;
    private String remark;
    private Long travelerUserId;
    private  String travelerUserName;
    private Long travelerTravelDetailId;
    private String travelerTravelDetailTitle;
    private List<DocDto> documents;
}

