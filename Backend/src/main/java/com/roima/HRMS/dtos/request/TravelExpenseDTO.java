package com.roima.HRMS.dtos.request;

import com.roima.HRMS.entites.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TravelExpenseDTO {
    @PositiveOrZero
    private Long amount;
    @NotNull
    private LocalDateTime expenseDate;

    private Long traveler;
    private List<String> fileNameList;
    private String ownerType;

    private String documentType;

}
