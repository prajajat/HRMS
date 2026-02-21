package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class UserBasicDTO {
    private Long userId;
    private String userName;
    private String personalEmail;
    private String companyEmail;
}