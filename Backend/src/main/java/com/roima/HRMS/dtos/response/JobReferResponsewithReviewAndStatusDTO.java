package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.util.List;
@Data
public class JobReferResponsewithReviewAndStatusDTO {
    List<JobReferResponseBaseDTO> myRefers;
    List<JobReferResponseWithReviewDTO> referToReview;
}
