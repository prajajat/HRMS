package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.responce.TravelDetailResponceDTO;
import com.roima.HRMS.services.TravelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/travel")
public class TravelController {

    private final TravelService travelService;
    private static final Logger logger= LoggerFactory.getLogger(TravelController.class);
    public TravelController(TravelService travelService)
    {
        this.travelService=travelService;
    }

    @GetMapping("/details/all")
    public ResponseEntity<List<TravelDetailResponceDTO>> getBooks(){
     logger.info("req come here");
        return ResponseEntity.ok(travelService.getAllTravelDetails());
    }
}
