package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_user_id")
    private Long userId;

    @Column(name = "user_name", length=25,nullable = false)
    private String userName;

    @Email
    @Column(name = "personal_email", length=60, nullable = false)
    private String personalEmail;

    @JsonIgnore
    @Column(name = "password", length=25, nullable = false)
    private String password;

    @Email
    @Column(name = "company_email", length=60,nullable = false)
    private String companyEmail;

    @Column(name = "designation")
    private String designation;


    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "date_of_join")
    private Date dateOfJoin;

    @Column(name = "image_url")
    private String imageUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;




    @OneToOne
    @JoinColumn(name="fk_user_id")
    private User managerId;

    @OneToOne(mappedBy = "managerId")
    private User manager;

    @ManyToOne
    @JoinColumn(name="fk_user_role_id")
    private Role role;


    @ManyToOne
    @JoinColumn(name="fk_user_department_id")
    private Department department;

    @OneToMany(mappedBy = "creadtedBy")
    private List<TravelDetail> createdTravelDetails;

    @ManyToMany(mappedBy = "users")
    private List<TravelDetail> travelDetails;


}





