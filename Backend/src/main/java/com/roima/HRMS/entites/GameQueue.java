package com.roima.HRMS.entites;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "game_queues")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "gameQueueId")
public class GameQueue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_game_queue_id")
    private Long gameQueueId;

    @Column(name = "total_played_in_cycle")
    private Integer totalPlayedInCycle;

    @Column(name = "penalty")
    private Integer penalty;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "priority_score")
    private Double priorityScore;

    @Column(name = "queue_time")
    private LocalDateTime queueTime;

    @ManyToOne
    @JoinColumn(name="fk_user_id")
    private User player;

    @OneToOne(mappedBy = "gameQueue")
    private Game game;

}
