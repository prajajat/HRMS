package com.roima.HRMS.dtos.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserResponseWithTeamAndManagerDTO {
    @NotNull
    private Long userId;
    @NotBlank
    private String companyEmail;
    @NotBlank
    private String name;
    private String imageUrl;
    private String departmentName;
    private String designation;
    private UserResponceWithManagerDTO manager;
   // private List<UserResponceWithManagerDTO> teamMember;
}
