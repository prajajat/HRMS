package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "tarvel_details")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "tarvelDetailId")
public class TravelDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_tarvel_detail_id")
    private Long tarvelDetailId;

    @Column(name = "title", length=25,nullable = false)
    private String title;

    @Column(name = "description", length=250,nullable = false)
    private String description;

    @PositiveOrZero
    @Column(name = "max_amout_per_day",nullable = false)
    private Long maxAmoutPerDay;

    @Column(name = "start_date",nullable = false)
    private LocalDateTime startDate;


    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="created_by")
    private User createdBy;

    @OneToMany(mappedBy = "travelDetail")
    private List<Traveler> travelers;

}






