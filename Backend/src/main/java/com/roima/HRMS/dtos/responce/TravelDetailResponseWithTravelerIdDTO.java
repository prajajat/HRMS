package com.roima.HRMS.dtos.responce;

import lombok.Data;

import java.util.List;
@Data
public class TravelDetailResponseWithTravelerIdDTO  extends TravelDetailResponseBaseDTO{
   private List<TravelerInfoWithId> travelers;
}
