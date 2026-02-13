package com.roima.HRMS.dtos.responce;

import lombok.Data;

@Data
public class TravelDetailsResponseWithInTeavelerIdDTO extends TravelDetailResponseWithOutTravelerIdDTO{
    private Long travelerId;
}
