package com.roima.HRMS.dtos.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;




@Data
class UserResponceBaseDTO {
        @NotNull
        private Long userId;
        @NotBlank
        private String companyEmail;
        @NotBlank
        private String name;
        private String imageUrl;
        private String departmentName;
        private String designation;
}
@Data
public class UserResponceWithManagerAndTeamDTO  extends UserResponceBaseDTO{


        private UserResponceWithManagerDTO manager;
        private List<UserResponceBaseDTO> teamMember;

}
@Data
class UserResponceWithManagerDTO extends UserResponceBaseDTO{

        private UserResponceWithManagerDTO manager;
}

