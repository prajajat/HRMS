package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class TravelerDocumentResponseDTO {

    private Long travelerDocumentId;

    private String visibility;

    private DocWithUploaderDTO document;
    private TravelerDocDto traveler;

}
