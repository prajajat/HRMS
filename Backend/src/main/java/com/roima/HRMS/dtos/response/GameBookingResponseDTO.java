package com.roima.HRMS.dtos.response;

import com.roima.HRMS.componets.StatusType;
import com.roima.HRMS.entites.GameSlot;
import com.roima.HRMS.entites.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class GameBookingResponseDTO {
    private Long gameBookingId;
    private StatusType.BookingStatus status;
    private List<GameSlotResponseDTO> gameSlots;
    private List<UserResponseForEmailDTO> participants;
    private UserResponseForEmailDTO createdBy;
}
