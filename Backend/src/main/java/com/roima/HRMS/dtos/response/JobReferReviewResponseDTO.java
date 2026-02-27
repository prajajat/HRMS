package com.roima.HRMS.dtos.response;

import com.roima.HRMS.entities.JobRefer;
import com.roima.HRMS.entities.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalTime;

@Data
public class JobReferReviewResponseDTO {

    private Long jobReferReviewId;
    private String status;
    private LocalTime updateAt;
    private UserResponseForEmailDTO updatedBy;
   // private JobRefer jobRefer;
}
