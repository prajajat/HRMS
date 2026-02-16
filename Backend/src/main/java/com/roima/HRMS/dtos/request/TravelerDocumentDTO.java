package com.roima.HRMS.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TravelerDocumentDTO {
    @NotEmpty
    private String visibility;

    private Long travelerId;
    private String fileName;
    private String ownerType;

    private String documentType;
    private Long travelDetailId;

}
