package com.roima.HRMS.dtos.request;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostFilterDTO {
    private Long tagId;
    private Long authorId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String visibility;
    private String search;
}
