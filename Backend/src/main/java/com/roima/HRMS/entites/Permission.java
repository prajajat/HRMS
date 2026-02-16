package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
@Entity
@Table(name = "permissions")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "permissionId")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_permission_id")
    private Long permissionId;


    @Column(name = "title",nullable = false)
    private String title;

    @ManyToMany(mappedBy = "permissions")
    private List<Role> roles;

}
