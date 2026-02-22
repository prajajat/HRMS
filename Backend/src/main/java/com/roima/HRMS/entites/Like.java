package com.roima.HRMS.entites;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "likes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"fk_post_id", "fk_user_id"}),
    @UniqueConstraint(columnNames = {"fk_comment_id", "fk_user_id"})
})
@Data
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fk_post_id")
    private Post post; // null for comment like

    @ManyToOne
    @JoinColumn(name = "fk_comment_id")
    private Comment comment; // null for post like

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @Column(name = "like_at")
    private LocalDateTime likeAt;
}
