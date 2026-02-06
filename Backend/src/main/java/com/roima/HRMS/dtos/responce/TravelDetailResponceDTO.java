package com.roima.HRMS.dtos.responce;

import com.roima.HRMS.entites.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class TravelDetailResponceDTO {

    private Long tarvelDetailId;
    private String title;
    private String description;
    private Long maxAmoutPerDay;
    private Date startDate;
    private Date endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private User creadtedBy;

}

