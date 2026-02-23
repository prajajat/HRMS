package com.roima.HRMS.dtos.response;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class PostResponseDTO {
    private Long pkPostId;
    private Long authorId;
    private String authorName;
    private String authorImageUrl;
    private String title;
    private String description;
    private String visibility;
    private LocalDateTime createdAt;
    private Boolean isActive;
    private LocalDateTime updatedAt;
    private Long updatedBy;
    private Long createdFor;
    private String mainDocumentUrl;
    private Set<TagResponseDTO> tags;
    private Integer likesCount;
    private Integer commentsCount;
    private Boolean likedByCurrentUser;
}
