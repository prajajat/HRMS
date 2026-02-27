package com.roima.HRMS.entities;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalTime;

@Data
@Entity
@Table(name = "job_refer_reviews")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "jobReferReviewId")
public class JobReferReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_job_refer_review_id")
    private Long jobReferReviewId;

    @Column(name = "status")
    private String status;

    @UpdateTimestamp
    @Column(name = "update_at")
    private LocalTime updateAt;

    @ManyToOne
    @JoinColumn(name="fk_user_id")
    private User updatedBy;

    @ManyToOne
    @JoinColumn(name="fk_job_refer_id")
    private JobRefer jobRefer;
}
