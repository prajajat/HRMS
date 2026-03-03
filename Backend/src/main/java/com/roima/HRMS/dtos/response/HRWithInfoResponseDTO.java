package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class HRWithInfoResponseDTO {
    private Long totalJobCreated;
    private Long totalExpenseReviewed;
    private Long totalTravelCreated;
    private Long totalPostDeleted;
    private Long totalDocumentUploaded;
}
