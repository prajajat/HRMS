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
    {       log.info("Fetching all games");
        return ResponseEntity.ok(gameService.getAllGame((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/{gameId}")
    public ResponseEntity<GameResponceWithSlotAndBookingDTO> getGameById(@PathVariable Long gameId)
    {
        log.info("Fetching game by id : {}",gameId);
        return ResponseEntity.ok(gameService.getGameById(gameId,(Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @PreAuthorize("hasAuthority('manage-game')")
    @GetMapping("/config/{gameId}")
    public ResponseEntity<GameConfigDTO> getGameConfig(@PathVariable Long gameId)
    {
        log.info("Fetching game config by game Id : {}",gameId);
        return ResponseEntity.ok(gameService.getGameConfig(gameId));
    }


    @PreAuthorize("hasAuthority('manage-game')")
    @PutMapping("/")
    public ResponseEntity<BasicResponse> updateGameConfig(@RequestBody GameConfigDTO game)
    {
        log.info("Updating game config by id : {}",game.getGameId());
        return ResponseEntity.ok(gameService.updateGameConfig(game));
    }


    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/booking")
    public ResponseEntity<BasicResponse> createBooking(@RequestBody GameBookingDTO dto)
    {
        log.info("Creating game booking for game: {} by: {}",dto.getGameId(),dto.getCreatedBy());
        return ResponseEntity.ok(gameService.createBooking(dto));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/interest")
    public ResponseEntity<BasicResponse> gameInterest(@RequestBody GameInterestDTO dto)
    {
        log.info("Updating game interest for game: {} by: {}",dto.getGame(),dto.getUserId());
        return ResponseEntity.ok(gameService.UpdateGameInterest(dto));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @DeleteMapping("/booking/{bookingId}")
    public ResponseEntity<BasicResponse> cancelBooking(@PathVariable Long bookingId)
    {
        log.info("Cancelling game booking for game booking: {} ",bookingId);
        return ResponseEntity.ok(gameService.cancelSlot(bookingId));
    }



}
