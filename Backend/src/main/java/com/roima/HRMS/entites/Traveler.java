package com.roima.HRMS.entites;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "traveler")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "travelerId")
public class Traveler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_traveler_id")
    private Long travelerId;

    @ManyToOne
    @JoinColumn(name = "fk_travel_details_id")
    private TravelDetail travelDetail;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @OneToMany(mappedBy = "traveler")
    private List<TravelerDocument> travelerDocuments;

    @OneToMany(mappedBy = "traveler")
    private List<TravelExpense> travelExpenses;

}
