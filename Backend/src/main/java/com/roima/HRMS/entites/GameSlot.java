package com.roima.HRMS.entites;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
@Entity
@Table(name = "slots")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "slotId")
public class GameSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_game_queue_id")
    private Long gameSlotId;

    @Column(name = "slot_start_time")
    private Time slotStartTime;

    @Column(name = "slot_end_time")
    private Time slotEndTime;

    @Column(name = "date")
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "slot_status")
    private BookingStatus slotStatus;

    @Column(name = "last_assign_to")
    private Long lastAssignTo;

    @ManyToOne
    @JoinColumn(name="fk_game_booking_id")
    private GameBooking gameBooking;

    @ManyToOne
    @JoinColumn(name = "fk_game_id")
    private Game game;
    //game
}
