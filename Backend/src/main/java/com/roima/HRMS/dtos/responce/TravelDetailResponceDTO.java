package com.roima.HRMS.dtos.responce;

import com.roima.HRMS.entites.User;
import lombok.Data;
import java.sql.Date;
import java.time.LocalDateTime;

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

