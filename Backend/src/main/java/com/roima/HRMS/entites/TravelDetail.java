package com.roima.HRMS.entites;

import jakarta.persistence.*;
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
@Setter
@Getter
@Entity
@Table(name = "tarvel_details")
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
    @Column(name = "max_amout_per_day", length=25,nullable = false)
    private Long maxAmoutPerDay;

    @Column(name = "start_date", length=25,nullable = false)
    private Date startDate;


    @Column(name = "end_date", length=25,nullable = false)
    private Date endDate;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name="created_by")
    private User creadtedBy;

    @ManyToMany
    @JoinTable(
            name = "travel_users",
            joinColumns = @JoinColumn(name = "fk_tarvel_detail_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    private List<User> users;

}






