package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.request.AddEmployeeDTO;
import com.roima.HRMS.dtos.request.TravelDetailDTO;
import com.roima.HRMS.dtos.responce.BasicResponce;
import com.roima.HRMS.dtos.responce.TravelDetailResponceDTO;
import com.roima.HRMS.services.TravelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/travel")
@Slf4j
@RequiredArgsConstructor
public class TravelController {

    private final TravelService travelService;

   // @PreAuthorize("hasAuthority('role:employee')")
    @GetMapping("/details/all")
    public ResponseEntity<List<TravelDetailResponceDTO>> getAllDetails(){
     //log.info("req come here{}", SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        return ResponseEntity.ok(travelService.getAllTravelDetails());
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<TravelDetailResponceDTO> getDetail(@PathVariable long id) {
        //log.info("req come here{}", SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        return ResponseEntity.ok(travelService.getTravelDetails(id));
    }

    @PostMapping("/details")
    public ResponseEntity<BasicResponce> createTravelDetail(@RequestBody TravelDetailDTO dto) {
        return ResponseEntity.ok(travelService.createTravelDetail(dto));
    }

    @PutMapping("/details/{id}")
    public ResponseEntity<BasicResponce> updateTravelDetails(@RequestBody TravelDetailDTO dto,@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.updateTravelDetails(id,dto));
    }
    @DeleteMapping("/details/{id}")
    public ResponseEntity<BasicResponce> deleteTravelDetails(@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.deleteTravelDetails(id));
    }

    @PostMapping("/details/employee")
    public ResponseEntity<BasicResponce> addEmployees(@RequestBody AddEmployeeDTO dto)
    {
        return ResponseEntity.ok(travelService.addEmployees(dto));
    }

    @DeleteMapping("/details/{id}/employee/{userId}")
    public ResponseEntity<BasicResponce> removeEmployee(@PathVariable long id,@PathVariable long userId)
    {
         log.info(" 1 -> {}->>>{}",id,userId);
        return ResponseEntity.ok(travelService.removeEmployee(id,userId));
    }



}
