package com.roima.HRMS.entities;

import com.roima.HRMS.components.StatusType;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "game_bookings")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "gameBookingId")
public class GameBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_game_booking_id")
    private Long gameBookingId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusType.BookingStatus status;

    @ManyToMany(mappedBy = "currentGameBookings",fetch = FetchType.EAGER)
    private List<GameSlot> bookingSlots;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "booking_participants",
            joinColumns = @JoinColumn(name = "fk_game_booking_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    private List<User> participants;

    @ManyToOne
    @JoinColumn(name="fk_game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name="fk_user_id")
    private User createdBy;


    @OneToMany(mappedBy = "gameBooking",fetch = FetchType.EAGER)
    private List<GameQueue> gameQueues;
}



