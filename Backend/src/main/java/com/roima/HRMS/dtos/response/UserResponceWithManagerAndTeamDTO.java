package com.roima.HRMS.dtos.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;





@Data
public class UserResponceWithManagerAndTeamDTO  extends UserResponceBaseDTO{


        private UserResponceWithManagerDTO manager;
        private List<UserResponceBaseDTO> teamMember;

}
@Data
class UserResponceWithManagerDTO extends UserResponceBaseDTO{

        private UserResponceWithManagerDTO manager;
}

