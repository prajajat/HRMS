package com.roima.HRMS.dtos.responce;

import com.roima.HRMS.entites.TravelExpense;
import com.roima.HRMS.entites.TravelerDocument;
import com.roima.HRMS.entites.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DocumentResponseDTO {
    private Long documentId;
    private String fileName;
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
}
