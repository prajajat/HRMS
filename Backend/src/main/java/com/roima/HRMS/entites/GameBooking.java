package com.roima.HRMS.entites;

import com.roima.HRMS.componets.StatusType;
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

    @ManyToMany(mappedBy = "currentGameBookings")
    private List<GameSlot> bookingSlots;

    @ManyToMany
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


    @OneToMany(mappedBy = "gameBooking")
    private List<GameQueue> gameQueues;
}



