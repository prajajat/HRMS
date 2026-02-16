package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data

public class DocWithUploaderDTO extends DocDto {
    private Long uploadedByUserId;
    private String uploadedByUserName;

}
