package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.request.*;
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



     //travel Details

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
    @PostMapping("/details")
    public ResponseEntity<BasicResponse> createTravelDetail(@RequestBody TravelDetailDTO dto) {
        return ResponseEntity.ok(travelService.createTravelDetail(dto));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PutMapping("/details/{id}")
    public ResponseEntity<BasicResponse> updateTravelDetails(@RequestBody TravelDetailDTO dto, @PathVariable long id)
    {
        return ResponseEntity.ok(travelService.updateTravelDetails(id,dto));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @DeleteMapping("/details/{id}")
    public ResponseEntity<BasicResponse> deleteTravelDetails(@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.deleteTravelDetails(id));
    }


    // travel details with employee
    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PostMapping("/details/employee")
    public ResponseEntity<BasicResponse> addEmployees(@RequestBody AddEmployeeDTO dto)
    {
        return ResponseEntity.ok(travelService.addEmployees(dto));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @DeleteMapping("/details/{id}/employee/{userId}")
    public ResponseEntity<BasicResponse> removeEmployee(@PathVariable long id, @PathVariable long userId)
    {
         log.info(" 1 -> {}->>>{}",id,userId);
        return ResponseEntity.ok(travelService.removeEmployee(id,userId));
    }



    // traveler
    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @GetMapping("/{id}/traveler/info/{userId}")
    public ResponseEntity<Long> getTravelerInfo(@PathVariable long id,@PathVariable long userId) {
        return ResponseEntity.ok(travelService.getTravelerInfo(id,userId));
    }


    // travel expence
    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/expense/all/{travelerId}")
    public ResponseEntity<List<TravelExpenseResponseDTO>> getAllTravelExpenseByTravelerId(@PathVariable long travelerId){
        return ResponseEntity.ok(travelService.getAllTravelExpenseByTravelerId(travelerId));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PostMapping("/expense")
    public ResponseEntity<BasicResponse> createTravelExpense(@RequestBody TravelExpenseDTO dto) {
        return ResponseEntity.ok(travelService.createUpdateTravelExpense(dto,(long)-1));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PutMapping("/expense/{id}")
    public ResponseEntity<BasicResponse> updateTravelExpense(@RequestBody TravelExpenseDTO dto, @PathVariable long id) {
        return ResponseEntity.ok(travelService.createUpdateTravelExpense(dto,id));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PatchMapping("/expense/{id}/user/{userId}")
    public ResponseEntity<BasicResponse> patchTravelExpense(@RequestBody TravelExpenceStatusDTO dto, @PathVariable long id, @PathVariable long userId) {
        return ResponseEntity.ok(travelService.patchTravelExpense(dto,id,userId));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @DeleteMapping("/expense/{id}")
    public ResponseEntity<BasicResponse> deleteTravelExpense(@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.deleteTravelExpense(id));
    }


    //travel document
    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/{id}/document/uploader/all/{userId}")
    public ResponseEntity<List<DocumentResponseDTO>> getAllTravelerDocumentByUploadedId(@PathVariable long id,@PathVariable long userId){
        return ResponseEntity.ok(travelService.getAllTravelerDocumentByTravelAndUser(id,userId));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/document/traveler/all/{travelerId}")
    public ResponseEntity<List<TravelerDocumentResponseDTO>> getAllTravelerDocumentByTravelerId(@PathVariable long travelerId){
        return ResponseEntity.ok(travelService.getAllTravelerDocumentByTravelerId(travelerId));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PostMapping("/document")
    public ResponseEntity<BasicResponse> createTravelerDocument(@RequestBody TravelerDocumentDTO dto) {
        return ResponseEntity.ok(travelService.createTravelerDocument(dto));
    }

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @DeleteMapping("/document/{id}")
    public ResponseEntity<BasicResponse> deleteTravelerDocument(@PathVariable long id)
    {
        return ResponseEntity.ok(travelService.deleteTravelerDocument(id));
    }

}
