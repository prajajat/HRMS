package com.roima.HRMS.dtos.request;

import lombok.Data;

@Data
public class CommentCreateDTO {
    private String desc;
    private Long parentCommentId; // null for top-level comments
}
