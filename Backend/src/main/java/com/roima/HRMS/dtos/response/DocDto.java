package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class DocDto {
    private long documentId;
    private  String fileName;
    private  String url;
}

