package com.roima.HRMS.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class AddEmployeeDTO  {
    @NotNull
    private Long travelDetailsId;
    @NotEmpty
    private List<Long> employees;
}
