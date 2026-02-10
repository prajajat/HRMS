package com.roima.HRMS.entites;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "traveler_documents")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "travelerDocumentId")
public class TravelerDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_traveler_document_id")
    private Long travelerDocumentId;

    @Column(name = "visibility",nullable = false)
    private String visibility;

    @ManyToOne
    @JoinColumn(name = "fk_document_id")
    private Document document;

    @ManyToOne
    @JoinColumn(name = "fk_traveler_id")
    private Traveler traveler;
}

