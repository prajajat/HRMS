package com.roima.HRMS.dtos.request;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class PostCreateDTO {
    private String title;
    private String desc;
    private String visibility; // e.g., "all", "department", "manager", "private"
    private Set<Long> tagIds;
    private Long mainDocumentId; // optional
}
