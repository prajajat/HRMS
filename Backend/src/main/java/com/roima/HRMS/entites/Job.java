package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.roima.HRMS.componets.StatusType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "jobs")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "jobId")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_job_id")
    private Long jobId;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "title",nullable = false )
    private String title;

    @Column(name = "description",nullable = false )
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @ManyToMany
    @JoinTable(
            name = "job_reviewers",
            joinColumns = @JoinColumn(name = "fk_job_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    private List<User> reviewers;


    @ManyToMany
    @JoinTable(
            name = "job_hrs",
            joinColumns = @JoinColumn(name = "fk_job_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    private List<User> hrs;



    @ManyToOne
    @JoinColumn(name="fk_user_id")
    private User createdBy;


    @OneToMany(mappedBy = "job")
    private List<JobShare> jobShares;


    @OneToMany(mappedBy = "job")
    private List<JobRefer> jobRefers;

    @OneToOne
    @JoinColumn(name="fk_doc_id")
    private Document jobDescription;

}
