package com.roima.HRMS.controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.roima.HRMS.dtos.request.*;
import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.services.TravelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/travel")
@Slf4j
@RequiredArgsConstructor
public class TravelController {

    private final TravelService travelService;



     //travel Details

    @PreAuthorize("hasAuthority('manage-travel')")
    @GetMapping("/details/all")
    public ResponseEntity<List<TravelDetailResponseWithOutTravelerIdDTO>> getAllDetails(){
        log.info("Fetching all travel details");
      return ResponseEntity.ok(travelService.getAllTravelDetails());
    }

    @PreAuthorize("hasAuthority('access-travel')")
    @GetMapping("/details/{id}")
    public ResponseEntity<TravelDetailResponseWithOutTravelerIdDTO> getDetail(@PathVariable long id) {
        log.info("Fetching travel details by id  : {}",id);
         return ResponseEntity.ok(travelService.getTravelDetails(id));
    }

    @PreAuthorize("hasAuthority('manage-travel')")
    @GetMapping("/details/creater/all/{id}")
    public ResponseEntity<List<TravelDetailResponseWithTravelerIdDTO>> getDetailByCreater(@PathVariable long id) {
        log.info("Fetching travel details by create id : {}",id);
        return ResponseEntity.ok(travelService.getTravelDetailsByCreater(id));
    }

    @PreAuthorize("hasAuthority('access-travel')")
    @GetMapping("/details/traveler/all")
    public ResponseEntity<List<TravelDetailsResponseWithInTeavelerIdDTO>> getDetailByTraveler() {
        Long id=(Long)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Fetching travel details by traveler id : {}",id);
        return ResponseEntity.ok(travelService.getTravelDetailsByTraveler(id));
    }

    @PreAuthorize("hasAuthority('manage-travel')")
    @PostMapping("/details")
    public ResponseEntity<BasicResponse> createTravelDetail(@RequestBody TravelDetailDTO dto) {
        log.info("Creating travel details: {}",dto.getTitle());
        return ResponseEntity.ok(travelService.createTravelDetail(dto));
    }

    @PreAuthorize("hasAuthority('manage-travel')")
    @PutMapping("/details/{id}")
    public ResponseEntity<BasicResponse> updateTravelDetails(@RequestBody TravelDetailDTO dto, @PathVariable long id)
    {
        log.info("Updating travel details: {}",dto.getTitle());
        return ResponseEntity.ok(travelService.updateTravelDetails(id,dto));
    }

    @PreAuthorize("hasAuthority('manage-travel')")
    @DeleteMapping("/details/{id}")
    public ResponseEntity<BasicResponse> deleteTravelDetails(@PathVariable long id)
    {
        log.info("Deleting travel details by id : {}",id);
        return ResponseEntity.ok(travelService.deleteTravelDetails(id));
    }


    // travel details with employee
    @PreAuthorize("hasAuthority('manage-travel')")
    @PostMapping("/details/employee")
    public ResponseEntity<BasicResponse> addEmployees(@RequestBody AddEmployeeDTO dto)
    {
        log.info("Add Employee to travel Details : {} {}",dto.getTravelDetailsId(),dto.getEmployees());
        return ResponseEntity.ok(travelService.addEmployees(dto));
    }

    @PreAuthorize("hasAuthority('manage-travel')")
    @DeleteMapping("/details/{id}/employee/{userId}")
    public ResponseEntity<BasicResponse> removeEmployee(@PathVariable long id, @PathVariable long userId)
    {
         log.info("Remove Employee :{} ,from travel details :{}",userId,id);
        return ResponseEntity.ok(travelService.removeEmployee(id,userId));
    }



    // traveler
//    @PreAuthorize("hasAuthority('DML-travel-detail')")
//    @GetMapping("/{id}/traveler/info/{userId}")
//    public ResponseEntity<Long> getTravelerInfo(@PathVariable long id,@PathVariable long userId) {
//        return ResponseEntity.ok(travelService.getTravelerInfo(id,userId));
//    }


    // travel expence
    @PreAuthorize("hasAuthority('access-travel')")
    @GetMapping("/expense/all/{travelerId}")
    public ResponseEntity<List<TravelExpenseResponseDTO>> getAllTravelExpenseByTravelerId(@PathVariable long travelerId){
        log.info("Fetching travel expense by traveler id:{}",travelerId);
        return ResponseEntity.ok(travelService.getAllTravelExpenseByTravelerId(travelerId));
    }

    // travel expence
    @PreAuthorize("hasAuthority('access-travel')")
    @GetMapping("/expense/all")
    public ResponseEntity<List<TravelExpenseResponseDTO>> getAllTravelExpense( @ModelAttribute TravelExpenseFilterDTO filter){
        log.info("Fetching all travel expense with filter {}",filter.toString());
        return ResponseEntity.ok(travelService.getAllTravelExpenseByFilter(filter));
    }




    @PreAuthorize("hasAuthority('access-traveler')")
    @PostMapping(value = "/expense",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BasicResponse> createTravelExpense(
            @RequestParam("expenseData") String dto,
            @RequestParam(value="documents")List<MultipartFile> documents) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        TravelExpenseDTO newDTO = mapper.readValue(dto, TravelExpenseDTO.class);
        log.info("Creating travel expense for traveler id : {}",newDTO.getTraveler());
        return ResponseEntity.ok(travelService.createUpdateTravelExpense(newDTO,documents,(long)-1));
    }

    @PreAuthorize("hasAuthority('manage-travel')")
    @PutMapping("/expense/{id}")
    public ResponseEntity<BasicResponse> updateTravelExpense(@RequestBody TravelExpenseDTO dto, @PathVariable long id) {
        //travelService.createUpdateTravelExpense(dto);
        return ResponseEntity.ok(new BasicResponse("coming soon..."));
    }

    @PreAuthorize("hasAuthority('manage-travel')")
    @PatchMapping("/expense/{id}/user/{userId}")
    public ResponseEntity<BasicResponse> patchTravelExpense(@RequestBody TravelExpenceStatusDTO dto, @PathVariable long id, @PathVariable long userId) {
        log.info("Updating travel expense {}   by:{} ",id,userId);
        return ResponseEntity.ok(travelService.patchTravelExpense(dto,id,userId));
    }

    @PreAuthorize("hasAuthority('access-travel')")
    @DeleteMapping("/expense/{id}")
    public ResponseEntity<BasicResponse> deleteTravelExpense(@PathVariable long id)
    {
        log.info("Deleting travel expense by id : {}",id);
        return ResponseEntity.ok(travelService.deleteTravelExpense(id));
    }


    //travel document
    @PreAuthorize("hasAuthority('access-travel')")
    @GetMapping("/document/uploader/all/")
    public ResponseEntity<List<DocumentResponseDTO>> getAllTravelerDocument(){
        log.info("Fetching all travel documents");
        return ResponseEntity.ok(travelService.getAllTravelerDocuments());
    }

    @PreAuthorize("hasAuthority('access-travel')")
    @GetMapping("/document/traveler/all/{travelerId}")
    public ResponseEntity<List<TravelerDocumentResponseDTO>> getAllTravelerDocumentByTravelerId(@PathVariable long travelerId){
        log.info("Fetching travel documents by traveler id:{}",travelerId);
        return ResponseEntity.ok(travelService.getAllTravelerDocumentByTravelerId(travelerId));
    }

    @PreAuthorize("hasAuthority('access-travel') ")
    @PostMapping(value = "/document",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BasicResponse> createTravelerDocument(
            @RequestParam("tarvelerDocumentData") String dto,
            @RequestParam(value="document")MultipartFile document) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        TravelerDocumentDTO newDTO = mapper.readValue(dto, TravelerDocumentDTO.class);
        log.info("Creating travel document for travel details id:{}",newDTO.getTravelDetailId());
        return ResponseEntity.ok(travelService.createTravelerDocument(newDTO,document,(Long)SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @PreAuthorize("hasAuthority('access-travel')")
    @DeleteMapping("/document/{id}")
    public ResponseEntity<BasicResponse> deleteTravelerDocument(@PathVariable long id)
    {
        log.info("Deleting travel document by id : {}",id);
        return ResponseEntity.ok(travelService.deleteTravelerDocument(id));
    }


    //manager view
    @PreAuthorize("hasAuthority('view-travel-doc')")
    @GetMapping("/document/manager/{id}")
    public ResponseEntity<List<TravelerDocumentResponseDTO>> getAllTravelerDocumentForManager(@PathVariable Long id){
        log.info("Fetching all travel documents by manager id: {}",id);
        return ResponseEntity.ok(travelService.getAllTravelerDocumentForManager(id));
    }

}
