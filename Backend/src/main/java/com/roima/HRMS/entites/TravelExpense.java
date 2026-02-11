package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "travel_expenses")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "pk_travel_expenses_id")
public class TravelExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_travel_expenses_id")
    private Long travelExpensesId;

    @PositiveOrZero
    @Column(name = "amount",nullable = false)
    private Long amount;

    @Column(name = "expense_date")
    private LocalDateTime expenseDate;

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

    @OneToMany(mappedBy ="travelExpense")
    private List<Document> documents;


}






