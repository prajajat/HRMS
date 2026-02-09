package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.responce.TravelDetailResponceDTO;
import com.roima.HRMS.services.TravelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/travel")
@Slf4j
@RequiredArgsConstructor
public class TravelController {

    private final TravelService travelService;

   // @PreAuthorize("hasAuthority('role:employee')")
    @GetMapping("/details/all")
    public ResponseEntity<List<TravelDetailResponceDTO>> getBooks(){
     //log.info("req come here{}", SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        return ResponseEntity.ok(travelService.getAllTravelDetails());
    }

}
