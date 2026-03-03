package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.util.List;

@Data
public class EmployeeWithInfoResponseDTO {
    private List<GameWithTotalSlotPlayedResponseDTO> games;
    private Long totalTravelAssign;
    private Long totalPost;
    private Long totalJobReferrals;
    private Long totalJobReferralsReviewed;
    private Long totalJobShare;
}
