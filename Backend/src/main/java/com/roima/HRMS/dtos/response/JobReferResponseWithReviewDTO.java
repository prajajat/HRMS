package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.util.List;

@Data
public class JobReferResponseWithReviewDTO extends JobReferResponseBaseDTO {
    List<JobReferReviewResponseDTO> jobReferReviews;
}
