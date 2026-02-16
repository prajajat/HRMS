package com.roima.HRMS.dtos.response;

import lombok.Data;

import java.util.List;

@Data
public class TravelDetailResponseWithOutTravelerIdDTO extends TravelDetailResponseBaseDTO {
   private List<TravelerInfo>travelers;
}
