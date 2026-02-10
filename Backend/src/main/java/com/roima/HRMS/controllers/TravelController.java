package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.request.AddEmployeeDTO;
import com.roima.HRMS.dtos.request.TravelDetailDTO;
import com.roima.HRMS.dtos.request.TravelExpenceDTO;
import com.roima.HRMS.dtos.responce.*;
import com.roima.HRMS.services.TravelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/travel")
@Slf4j
@RequiredArgsConstructor
public class TravelController {

    private final TravelService travelService;

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/details/all")
    public ResponseEntity<List<TravelDetailResponseWithOutTravelerIdDTO>> getAllDetails(){
      return ResponseEntity.ok(travelService.getAllTravelDetails());
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/details/{id}")
    public ResponseEntity<TravelDetailResponseWithOutTravelerIdDTO> getDetail(@PathVariable long id) {
         return ResponseEntity.ok(travelService.getTravelDetails(id));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PostMapping("/details")
    public ResponseEntity<BasicResponce> createTravelDetail(@RequestBody TravelDetailDTO dto) {
        return ResponseEntity.ok(travelService.createTravelDetail(dto));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PostMapping("/expense")
    public ResponseEntity<BasicResponce> createTravelExpense(@RequestBody TravelExpenceDTO dto) {
        return ResponseEntity.ok(travelService.createUpdateTravelExpense(dto,(long)-1));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PutMapping("/expense/{id}")
    public ResponseEntity<BasicResponce> updateTravelExpense(@RequestBody TravelExpenceDTO dto,@PathVariable long id) {
        return ResponseEntity.ok(travelService.createUpdateTravelExpense(dto,id));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PutMapping("/details/{id}")
    public ResponseEntity<BasicResponce> updateTravelDetails(@RequestBody TravelDetailDTO dto,@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.updateTravelDetails(id,dto));
    }
    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @DeleteMapping("/expense/{id}")
    public ResponseEntity<BasicResponce> deleteTravelExpense(@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.deleteTravelExpense(id));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @DeleteMapping("/details/{id}")
    public ResponseEntity<BasicResponce> deleteTravelDetails(@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.deleteTravelDetails(id));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PostMapping("/details/employee")
    public ResponseEntity<BasicResponce> addEmployees(@RequestBody AddEmployeeDTO dto)
    {
        return ResponseEntity.ok(travelService.addEmployees(dto));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @DeleteMapping("/details/{id}/employee/{userId}")
    public ResponseEntity<BasicResponce> removeEmployee(@PathVariable long id,@PathVariable long userId)
    {
         log.info(" 1 -> {}->>>{}",id,userId);
        return ResponseEntity.ok(travelService.removeEmployee(id,userId));
    }


    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @GetMapping("/details/creater/all/{id}")
    public ResponseEntity<List<TravelDetailResponseWithTravelerIdDTO>> getDetailByCreater(@PathVariable long id) {
        return ResponseEntity.ok(travelService.getTravelDetailsByCreater(id));
    }


    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @GetMapping("/details/traveler/all/{id}")
    public ResponseEntity<List<TravelDetailResponseWithOutTravelerIdDTO>> getDetailByTraveler(@PathVariable long id) {
        return ResponseEntity.ok(travelService.getTravelDetailsByTraveler(id));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @GetMapping("/{id}/traveler/info/{userId}")
    public ResponseEntity<Long> getTravelerInfo(@PathVariable long id,@PathVariable long userId) {
        return ResponseEntity.ok(travelService.getTravelerInfo(id,userId));
    }


    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/expense/all/{travelerId}")
    public ResponseEntity<List<TravelExpenceResponceDTO>> getAllTravelExpenseByTravelerId(@PathVariable long travelerId){
        return ResponseEntity.ok(travelService.getAllTravelExpenseByTravelerId(travelerId));
    }
}
