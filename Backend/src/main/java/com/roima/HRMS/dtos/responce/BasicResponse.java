package com.roima.HRMS.dtos.responce;

import lombok.Data;

@Data
public class BasicResponse {
 private String message;
 public BasicResponse(String msg)
 {
     this.message=msg;
 }
}
