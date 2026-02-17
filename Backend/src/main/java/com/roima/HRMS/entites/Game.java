package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "games")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "gameId")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_game_id")
    private Long gameId;

    @Column(name = "game_name",nullable = false )
    private String gameName;

    @Column(name = "slot_start_time")
    private Time slotStartTime;

    @Column(name = "slot_end_time")
    private Time slotEndTime;

    @Column(name = "cycle_start_date")
    private Date cycleStartDate;

    @Column(name = "cycle_end_date")
    private Date cycleEndDate;

    @Column(name = "slot_duration_minutes")
    private Integer slotDurationMinutes;

    @Column(name = "max_player_per_slot")
    private Integer maxPlayerPerSlot;

    @Column(name = "max_slot_per_booking")
    private Integer maxSlotPerBooking;

    @Column(name = "is_open_for_weekend")
    private Boolean isOpenForWeekend;

    @Column(name = "max_day_of_booking_allow")
    private Integer maxDayOfBookingAllow;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    //mapping
    @OneToMany(mappedBy = "game")
    private List<GameBooking> gameBookings;

    @OneToMany(mappedBy = "game")
    private List<GameQueue> gameQueues;

    @OneToMany(mappedBy = "game")
    private List<GameSlot> gameSlots;


    @ManyToMany
    @JoinTable(
            name = "game_player_inerestes",
            joinColumns = @JoinColumn(name = "fk_game_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    private List<User> inerestedPlayers;

}

