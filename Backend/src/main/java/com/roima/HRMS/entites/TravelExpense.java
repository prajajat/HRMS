package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "travel_expences")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "pk_travel_expences_id")
public class TravelExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_travel_expences_id")
    private Long travelExpencesId;

    @PositiveOrZero
    @Column(name = "amount",nullable = false)
    private Long amount;

    @Column(name = "expence_date")
    private LocalDateTime expenceDate;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "remark", nullable = true)
    private String remark;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "fk_traveler_id")
    private Traveler traveler;

    @OneToMany(mappedBy ="travelExpence")
    private List<Document> documents;


}






