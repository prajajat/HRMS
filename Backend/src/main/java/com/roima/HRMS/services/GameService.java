package com.roima.HRMS.services;


import com.roima.HRMS.dtos.request.GameBookingDTO;
import com.roima.HRMS.dtos.response.BasicResponse;
import com.roima.HRMS.entites.GameSlot;
import com.roima.HRMS.entites.User;
import com.roima.HRMS.repos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final GameBookingRepository gameBookingRepository;
    private final GameSlotRepository gameSlotRepository;
    private final GameRepository gameRepository;
    private final GameQueueRepository gameQueueRepository;
    private final UserRepository userRepository;

    public BasicResponse createBooking(GameBookingDTO dto)
    {
        User createdBy=findUserById(dto.getCreatedBy());
        List<GameSlot> gameSlot=dto.getGameSlots()!=null ?
        dto.getGameSlots().stream().map(gameSlotId-> findGameSlotById(gameSlotId)).toList():new ArrayList<>();
        List<User> players=dto.getAllPlayers()!=null?dto.getAllPlayers().stream().map(p->findUserById(p)).toList():new ArrayList<>();
      return new BasicResponse("n");
    }

    public User findUserById(Long id)
    {
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("user  not found"));
    }

    public GameSlot findGameSlotById(Long id)
    {
        return gameSlotRepository.findById(id).orElseThrow(()-> new RuntimeException("game slot not found"));
    }
}
