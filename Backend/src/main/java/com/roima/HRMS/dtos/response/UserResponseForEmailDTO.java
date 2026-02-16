package com.roima.HRMS.dtos.response;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class UserResponseForEmailDTO {
    @NotNull
    private Long userId;
    @NotBlank
    private String companyEmail;
    @NotBlank
    private String name;

}
