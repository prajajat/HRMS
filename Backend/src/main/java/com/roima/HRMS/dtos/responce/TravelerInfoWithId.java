package com.roima.HRMS.dtos.responce;

import lombok.Data;

@Data
public class TravelerInfoWithId {
    private long travelerId;
    private long travelerUserId;
    private String travelerUserName;
}
