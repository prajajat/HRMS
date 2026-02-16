package com.roima.HRMS.dtos.response;

import lombok.Data;

@Data
public class TravelDetailsResponseWithInTeavelerIdDTO extends TravelDetailResponseWithOutTravelerIdDTO{
    private Long travelerId;
}
