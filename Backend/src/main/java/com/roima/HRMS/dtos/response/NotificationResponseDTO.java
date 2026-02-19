package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class NotificationResponseDTO {
    private Long notificationId;

    private String title;

    private String description;
    private Boolean isRead;
}
