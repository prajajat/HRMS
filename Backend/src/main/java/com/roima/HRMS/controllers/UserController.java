package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/employee/all")
    public ResponseEntity<List<UserResponseForEmailDTO>> getAllEmployee(){
        log.info("Fetching all employees ");
        return ResponseEntity.ok(userService.getAllUserWithNameAndEmail());
    }


    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponseForEmailDTO>> getAllUser(){
        log.info("Fetching all User");
        return ResponseEntity.ok(userService.getAllUser());
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/hr/all")
    public ResponseEntity<List<UserResponseForEmailDTO>> getAllUserWithHrRole(){
        log.info("Fetching all User with HR role");
        return ResponseEntity.ok(userService.getAllUserWithHrRole());
    }


    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/notification/all")
    public ResponseEntity<List<NotificationResponseDTO>> getAllNotification(){
        Long id=(Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Fetching all notifications for user by id: {}",id);
        return ResponseEntity.ok(userService.getAllNotification(id));
    }
    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/notification/count")
    public ResponseEntity<Long> getNewNotificationCount(){
        Long id=(Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Fetching new notifications count for user by id: {}",id);
        return ResponseEntity.ok(userService.getNewNotificationCount(id));
    }


    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/team-members")
    public ResponseEntity<List<UserResponceBaseDTO>> getTeamMemberByManager(){
        Long id=(Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Fetching Team members by manager id : {}",id);
        return ResponseEntity.ok(userService.getTeamMemberByManager(id));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponceWithManagerAndTeamDTO> getUserById(@PathVariable Long id){
        log.info("Fetching all User by id : {}",id);
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/employee/dashboard")
    public ResponseEntity<EmployeeWithInfoResponseDTO> getEmployeeInfo(){
        Long id=(Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Fetching employee dashboard info : {}",id);
        return ResponseEntity.ok(userService.getEmployeeInfo(id));
    }


    @PreAuthorize("hasAuthority('Hr-dashboard')")
    @GetMapping("/hr/dashboard")
    public ResponseEntity<HRWithInfoResponseDTO> getHRInfo(){
        Long id=(Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Fetching hr dashboard info : {}",id);
        return ResponseEntity.ok(userService.getHRInfo(id));
    }
}
