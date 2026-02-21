package com.roima.HRMS.dtos.response;

import com.roima.HRMS.entites.Document;
import com.roima.HRMS.entites.JobRefer;
import com.roima.HRMS.entites.JobShare;
import com.roima.HRMS.entites.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class JobResponseDTO {

    private Long jobId;
    private String title;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UserResponseForEmailDTO createdBy;

    private DocDto jobDescription;
}
