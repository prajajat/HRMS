package com.roima.HRMS.entites;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.roima.HRMS.componets.StatusType;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Data
@Entity
@Table(name = "game_slots")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "slotId")
public class GameSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_game_slot_id")
    private Long gameSlotId;

    @Column(name = "slot_start_time")
    private Time slotStartTime;

    @Column(name = "slot_end_time")
    private Time slotEndTime;

    @Column(name = "date")
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "slot_status")
    private StatusType.BookingStatus slotStatus;

    @ManyToMany
    @JoinTable(
            name = "slot_cancellers",
            joinColumns = @JoinColumn(name = "fk_slot_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    private List<User> cancellers;

    @ManyToMany
    @JoinTable(
            name = "slot_bookings",
            joinColumns = @JoinColumn(name = "fk_slot_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_booking_id"))
    private List<GameBooking> currentGameBookings;

    @ManyToOne
    @JoinColumn(name = "fk_game_id")
    private Game game;


}
