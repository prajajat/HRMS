package com.roima.HRMS.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TravelerDocumentDTO {
    @NotEmpty
    private String visibility;
    @NotNull
    private Long  documentId;

    private Long travelerId;

    private Long travelDetailId;
}
