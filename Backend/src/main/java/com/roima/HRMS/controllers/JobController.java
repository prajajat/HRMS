package com.roima.HRMS.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.roima.HRMS.dtos.request.AddHrDTO;
import com.roima.HRMS.dtos.request.AddReviewerDTO;
import com.roima.HRMS.dtos.request.JobCreateDTO;
import com.roima.HRMS.dtos.request.JobFilterDTO;
import com.roima.HRMS.dtos.request.JobReferCreateDTO;
import com.roima.HRMS.dtos.request.JobShareCreateDTO;
import com.roima.HRMS.dtos.request.JobStatusPatchDTO;
import com.roima.HRMS.dtos.request.SystemConfigPatchDTO;
import com.roima.HRMS.dtos.response.BasicResponse;
import com.roima.HRMS.dtos.response.JobReferResponseDTO;
import com.roima.HRMS.dtos.response.JobResponseDTO;
import com.roima.HRMS.dtos.response.JobShareResponseDTO;
import com.roima.HRMS.dtos.response.SystemConfigResponseDTO;
import com.roima.HRMS.services.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/job")
@Slf4j
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PreAuthorize("hasAuthority('manage-job')")
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BasicResponse> createJob(
            @RequestParam("jobData") String dto,
            @RequestParam(value = "document", required = false) MultipartFile document) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        JobCreateDTO newDTO = mapper.readValue(dto, JobCreateDTO.class);
        log.info("Creating job: {}", newDTO.getTitle());
        return ResponseEntity.ok(jobService.createJob(newDTO, document));
    }

    @PreAuthorize("hasAuthority('manage-job')")
    @GetMapping("/all")
    public ResponseEntity<List<JobResponseDTO>> getAllJobs(@ModelAttribute JobFilterDTO filter) {
        log.info("Fetching all jobs with filter");
        return ResponseEntity.ok(jobService.getAllJobs(filter));
    }

    @PreAuthorize("hasAuthority('manage-job')")
    @PatchMapping("/{jobId}/status")
    public ResponseEntity<BasicResponse> patchJobStatus(
            @PathVariable Long jobId,
            @RequestBody JobStatusPatchDTO dto) {
        log.info("Patching job status for jobId: {}", jobId);
        return ResponseEntity.ok(jobService.patchJobStatus(jobId, dto));
    }

    @PreAuthorize("hasAuthority('manage-job')")
    @PostMapping("/{jobId}/reviewer")
    public ResponseEntity<BasicResponse> addReviewer(
            @PathVariable Long jobId,
            @RequestBody AddReviewerDTO dto) {
        log.info("Adding reviewer to job: {}", jobId);
        return ResponseEntity.ok(jobService.addReviewer(jobId, dto));
    }

    @PreAuthorize("hasAuthority('manage-job')")
    @PostMapping("/{jobId}/hr")
    public ResponseEntity<BasicResponse> addHr(
            @PathVariable Long jobId,
            @RequestBody AddHrDTO dto) {
        log.info("Adding HR to job: {}", jobId);
        return ResponseEntity.ok(jobService.addHr(jobId, dto));
    }

    @PreAuthorize("hasAuthority('manage-job')")
    @GetMapping("/config")
    public ResponseEntity<List<SystemConfigResponseDTO>> getSystemConfig() {
        log.info("Fetching system config");
        return ResponseEntity.ok(jobService.getSystemConfig());
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/active")
    public ResponseEntity<List<JobResponseDTO>> getActiveJobs(
            @RequestParam(required = false) String search) {
        log.info("Fetching active jobs with search: {}", search);
        return ResponseEntity.ok(jobService.getActiveJobs(search));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/refers")
    public ResponseEntity<List<JobReferResponseDTO>> getUserReferrals() {
        log.info("Fetching user referrals");
        return ResponseEntity.ok(jobService.getUserReferrals());
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping(value = "/{jobId}/refer", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BasicResponse> createReferral(
            @PathVariable Long jobId,
            @RequestParam("referData") String dto,
            @RequestParam(value = "cv", required = false) MultipartFile cv) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        JobReferCreateDTO newDTO = mapper.readValue(dto, JobReferCreateDTO.class);
        log.info("Creating referral for job: {}", jobId);
        return ResponseEntity.ok(jobService.createReferral(jobId, newDTO, cv));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/shares")
    public ResponseEntity<List<JobShareResponseDTO>> getUserShares() {
        log.info("Fetching user shares");
        return ResponseEntity.ok(jobService.getUserShares());
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/{jobId}/share")
    public ResponseEntity<BasicResponse> shareJob(
            @PathVariable Long jobId,
            @RequestBody JobShareCreateDTO dto) {
        log.info("Sharing job: {}", jobId);
        return ResponseEntity.ok(jobService.shareJob(jobId, dto));
    }

    @PreAuthorize("hasAuthority('manage-job')")
    @PatchMapping("/config")
    public ResponseEntity<BasicResponse> patchSystemConfig(
            @RequestBody SystemConfigPatchDTO dto) {
        log.info("Patching system config: {}", dto.getConfigKey());
        return ResponseEntity.ok(jobService.patchSystemConfig(dto));
    }
}