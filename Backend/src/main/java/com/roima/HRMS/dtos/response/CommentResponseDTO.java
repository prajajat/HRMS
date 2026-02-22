package com.roima.HRMS.dtos.response;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentResponseDTO {
    private Long pkCommentId;
    private Long authorId;
    private String authorName;
    private String description;
    private LocalDateTime createdAt;
    private Boolean isActive;
    private Long parentCommentId;
    private List<CommentResponseDTO> replies;
    private Integer likesCount;
    private Boolean likedByCurrentUser;
}
