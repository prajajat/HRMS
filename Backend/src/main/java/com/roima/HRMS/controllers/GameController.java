package com.roima.HRMS.controllers;


import com.roima.HRMS.dtos.request.GameBookingDTO;
import com.roima.HRMS.dtos.request.GameConfigDTO;
import com.roima.HRMS.dtos.request.GameInterestDTO;
import com.roima.HRMS.dtos.response.BasicResponse;
import com.roima.HRMS.dtos.response.GameResponceWithSlotAndBookingDTO;
import com.roima.HRMS.dtos.response.GameResponseDTO;
import com.roima.HRMS.services.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/all")
    public ResponseEntity<List<GameResponseDTO>> getAllGame()
    {
        return ResponseEntity.ok(gameService.getAllGame((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/{gameId}")
    public ResponseEntity<GameResponceWithSlotAndBookingDTO> getGameById(@PathVariable Long gameId)
    {
        return ResponseEntity.ok(gameService.getGameById(gameId,(Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @PreAuthorize("hasAuthority('manage-game')")
    @GetMapping("/config/{gameId}")
    public ResponseEntity<GameConfigDTO> getGameConfig(@PathVariable Long gameId)
    {
        return ResponseEntity.ok(gameService.getGameConfig(gameId));
    }


    @PreAuthorize("hasAuthority('manage-game')")
    @PutMapping("/")
    public ResponseEntity<BasicResponse> updateGameConfig(@RequestBody GameConfigDTO game)
    {
        return ResponseEntity.ok(gameService.updateGameConfig(game));
    }


    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/booking")
    public ResponseEntity<BasicResponse> createBooking(@RequestBody GameBookingDTO dto)
    {
        return ResponseEntity.ok(gameService.createBooking(dto));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/interest")
    public ResponseEntity<BasicResponse> gameInterest(@RequestBody GameInterestDTO dto)
    {
        return ResponseEntity.ok(gameService.UpdateGameInterest(dto));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @DeleteMapping("/booking/{bookingId}")
    public ResponseEntity<BasicResponse> createBooking(@PathVariable Long bookingId)
    {
        return ResponseEntity.ok(gameService.cancelSlot(bookingId));
    }
}
