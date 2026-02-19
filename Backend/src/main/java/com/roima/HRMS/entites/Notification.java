package com.roima.HRMS.entites;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.ser.std.StdKeySerializers;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "notifications")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "notificationId")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_notification_id")
    private Long notificationId;

    @Column(name = "title",nullable = false )
    private String title;

    @Column(name = "description" )
    private String description;

    @Column(name = "is_readed",columnDefinition = "boolean default false")
    private Boolean isRead;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;
}
