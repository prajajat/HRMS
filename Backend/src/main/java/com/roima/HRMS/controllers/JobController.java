package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.response.JobResponseDTO;
import com.roima.HRMS.dtos.response.TravelDetailResponseWithOutTravelerIdDTO;
import com.roima.HRMS.services.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/job")
@Slf4j
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PreAuthorize("hasAuthority('access-job')")
    @GetMapping("/details/all")
    public ResponseEntity<List<JobResponseDTO>> getAllJobDetails(){
        return ResponseEntity.ok(jobService.getAllJobDetails());
    }

}
