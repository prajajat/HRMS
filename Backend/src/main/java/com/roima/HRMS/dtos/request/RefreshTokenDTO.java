package com.roima.HRMS.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenDTO {
    @NotBlank(message = "userId not found")
    private Long userId;
    @NotBlank(message = "refresh token not found")
    private String refreshToken;
}
