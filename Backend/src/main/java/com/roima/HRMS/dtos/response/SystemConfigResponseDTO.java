package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class SystemConfigResponseDTO {
    private Long configId;
    private String configKey;
    private String configValue;
    private String description;
}