package com.roima.HRMS.dtos.request;

import lombok.Data;
import java.util.Set;

@Data
public class PostUpdateDTO {
    private String title;
    private String desc;
    private String visibility;
    private Set<Long> tagIds;
    private Long mainDocumentId;
}
