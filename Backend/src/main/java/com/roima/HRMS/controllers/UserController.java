package com.roima.HRMS.controllers;

import com.roima.HRMS.dtos.responce.UserResponseForEmailDTO;
import com.roima.HRMS.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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
}
