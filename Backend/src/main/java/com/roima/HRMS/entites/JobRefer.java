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
@Table(name = "job_refers")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "jobReferId")
public class JobRefer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_job_refer_id")
    private Long jobReferId;

    @Email
    @Column(name = "friend_mail",nullable = false )
    private String friendMail;

    @Column(name = "friend_name",nullable = false )
    private String friendName;

    @Column(name = "short_note")
    private String shortNote;

    @CreationTimestamp
    @Column(name = "datetime" , updatable = false)
    private LocalTime datetime;

    @ManyToOne
    @JoinColumn(name="fk_job_id")
    private Job job;

    @OneToOne
    @JoinColumn(name="fk_doc_id")
    private Document cv;

    @ManyToOne
    @JoinColumn(name="fk_referer_id")
    private User referer;
}
