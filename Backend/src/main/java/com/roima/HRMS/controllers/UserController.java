package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.response.UserResponceWithManagerAndTeamDTO;
import com.roima.HRMS.dtos.response.UserResponseForEmailDTO;
import com.roima.HRMS.dtos.response.UserResponseWithTeamAndManagerDTO;
import com.roima.HRMS.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        return ResponseEntity.ok(userService.getAllUserWithNameAndEmail());
    }


    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponseForEmailDTO>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }



   // @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponceWithManagerAndTeamDTO> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
