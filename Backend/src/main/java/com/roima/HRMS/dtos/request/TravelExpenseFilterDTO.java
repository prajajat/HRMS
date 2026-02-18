package com.roima.HRMS.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TravelExpenseFilterDTO {
    private Long userId;
    private String status;
    private Long travelId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime expenseStartDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime expenseEndDate;

    public boolean hasFilters() {
        return userId!=null ||status!=null||travelId!=null|| expenseStartDate!=null||expenseEndDate!=null;
    }

}
