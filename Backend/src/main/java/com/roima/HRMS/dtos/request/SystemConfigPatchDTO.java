package com.roima.HRMS.dtos.request;

import lombok.Data;

@Data
public class SystemConfigPatchDTO {
    private String configKey;
    private String configValue;
}