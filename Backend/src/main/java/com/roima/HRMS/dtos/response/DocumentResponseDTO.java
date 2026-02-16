package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DocumentResponseDTO {
    private Long documentId;
    private String fileName;
    private String url;
    private String ownerType;
    private String documentType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserDto uploadedBy ;
    private List<TravelerDocDto> travelerDocuments;
}
@Data
class UserDto
{
   private String userName ;
   private String userId;
}
@Data
class TravelerDocDto{
    private String visibility;
    private UserDto traveler;
    private String travelerTravelDetailTarvelDetailId;
    private String travelerTravelDetailTitle;

}
