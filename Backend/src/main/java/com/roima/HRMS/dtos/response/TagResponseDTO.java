package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class TagResponseDTO {
    private Integer pkTagId;
    private String tagName;
    private Long createdByUserId;
    private String createdByUserName;
}
