package com.roima.HRMS.entites;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalTime;


@Data
@Entity
@Table(name = "job_shares")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "jobShareId")
public class JobShare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_job_share_id")
    private Long jobShareId;

    @Email
    @Column(name = "receiver_mail",nullable = false )
    private String receiverMail;

    @CreationTimestamp
    @Column(name = "datetime" , updatable = false)
    private LocalTime datetime;

    @ManyToOne
    @JoinColumn(name="fk_job_id")
    private Job job;

    @ManyToOne
    @JoinColumn(name="fk_sender_id")
    private User sender;
}
