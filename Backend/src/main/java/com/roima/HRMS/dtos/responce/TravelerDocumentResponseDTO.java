package com.roima.HRMS.dtos.responce;

import com.roima.HRMS.entites.Document;
import com.roima.HRMS.entites.Traveler;
import lombok.Data;

@Data
public class TravelerDocumentResponseDTO {

    private Long travelerDocumentId;

    private String visibility;

    private DocDto document;
    private TravelerDocDto traveler;

}
