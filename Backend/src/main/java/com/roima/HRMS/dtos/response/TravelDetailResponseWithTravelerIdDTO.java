package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.util.List;
@Data
public class TravelDetailResponseWithTravelerIdDTO  extends TravelDetailResponseBaseDTO{
   private List<TravelerInfoWithId> travelers;
}
