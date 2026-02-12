package com.roima.HRMS.dtos.responce;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class LoginResponseDTO {
     private String accessToken;
     @JsonIgnore
     private String refreshToken;
     private long userId;
     private List<RoleDTO> roles;

}

