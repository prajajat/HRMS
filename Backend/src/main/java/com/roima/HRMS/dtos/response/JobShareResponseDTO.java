package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.time.LocalTime;

@Data
public class JobShareResponseDTO {
    private Long jobShareId;
    private String receiverMail;
    private LocalTime datetime;
    private Long jobJobId;
    private String jobTitle;
    private String senderUserName;
    private Long senderUserId;
}