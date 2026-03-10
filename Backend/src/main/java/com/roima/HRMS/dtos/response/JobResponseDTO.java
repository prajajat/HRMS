package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class JobResponseDTO {

    private Long jobId;
    private String title;

    private String description;

    private Boolean status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Long createdById;

    private String createdByName;

    private List<UserBasicDTO> reviewers;

    private List<UserBasicDTO> hrs;

    private String jobDescriptionUrl;


}