package com.roima.HRMS.entites;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_document_id")
    private Long documentId;

    @Column(name = "file_name",nullable = false )
    private String fileName;

    @Column(name = "owner_type",nullable = false )
    private String ownerType;

    @Column(name = "document_type",nullable = false )
    private String documentType;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User uploadedBy ;
}

