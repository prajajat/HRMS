package com.roima.HRMS.entites;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "posts")
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pkPostId;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User author; // null for system posts

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "visibility")
    private String visibility;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "isActive")
    private Boolean isActive = true;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;

    @ManyToOne
    @JoinColumn(name = "deleted_by")
    private User deletedBy; // who deleted the post (HR or author)

    @ManyToOne
    @JoinColumn(name = "created_for")
    private User createdFor; // for system posts

    @ManyToMany
    @JoinTable(
        name = "post_tag_maps",
        joinColumns = @JoinColumn(name = "fk_post_id"),
        inverseJoinColumns = @JoinColumn(name = "fk_tag_id")
    )
    private Set<Tag> tags;
    
    @ManyToOne
    @JoinColumn(name = "main_document_id")
    private Document mainDocument;
}
