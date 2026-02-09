package com.roima.HRMS.dtos.responce;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class UserResponceForEmailDTO {
    @NotNull
    private Long userId;
    @NotBlank
    private String Email;
    @NotBlank
    private String name;
}
