package com.roima.HRMS.entites;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Setter
@Getter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_role_id")
    private Long roleId;


    @Column(name = "title",nullable = false)
    private String title;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}

