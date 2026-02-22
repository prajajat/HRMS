package com.roima.HRMS.entites;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pkCommentId;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "fk_post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "fk_parent_comment_id")
    private Comment parentComment;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "isActive")
    private Boolean isActive = true;
}
