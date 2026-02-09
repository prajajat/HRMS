package com.roima.HRMS.dtos.responce;

import lombok.Data;

@Data
public class LoginResponceDTO {
    private String accessToken;
    private String refreshToken;
}
