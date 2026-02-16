package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.request.GameBookingDTO;
import com.roima.HRMS.dtos.response.BasicResponse;
import com.roima.HRMS.services.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @PreAuthorize("hasAuthority('DML-travel-detail')")
    @PostMapping("/booking")
    public ResponseEntity<BasicResponse> createBooking(@RequestBody GameBookingDTO dto)
    {
        return ResponseEntity.ok(gameService.createBooking(dto));
    }
}
