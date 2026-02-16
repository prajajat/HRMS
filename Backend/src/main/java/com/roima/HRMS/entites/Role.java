package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;


import java.util.List;

@Data
@Entity
@Table(name = "roles")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "roleId")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_role_id")
    private Long roleId;


    @Column(name = "title",nullable = false)
    private String title;

    @ManyToMany
    @JoinTable(
            name = "users_role",
            joinColumns = @JoinColumn(name = "fk_role_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    private List<User> users;

    @ManyToMany
    @JoinTable(
            name = "role_permissions",
            joinColumns = @JoinColumn(name = "fk_role_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_permission_id"))
    private List<Permission> permissions;




}

