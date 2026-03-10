package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class JobReferResponseBaseDTO {
    private Long jobReferId;
    private String friendName;
    private String friendMail;
    private String shortNote;
    private LocalDateTime datetime;
    private Long jobJobId;
    private String jobTitle;
    private String refererUserName;
    private Long refererUserId;
    private String cvUrl;
    private String status;
}