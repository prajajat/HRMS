package com.roima.HRMS.dtos.responce;

import lombok.Data;

@Data
public class BasicResponce {
 private String message;
 public BasicResponce(String msg)
 {
     this.message=msg;
 }
}
