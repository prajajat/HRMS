package com.roima.HRMS.entites;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "userId")
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_user_id")
    private Long userId;

    @Column(name = "user_name", length=25,nullable = false)
    private String userName;

    @Email
    @Column(name = "personal_email", length=60, nullable = false,unique = true)
    private String personalEmail;

    @JsonIgnore
    @Column(name = "password", length=100, nullable = false)
    private String password;

    @Email
    @Column(name = "company_email", length=60,nullable = false,unique = true)
    private String companyEmail;

    @Column(name = "designation")
    private String designation;


    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "date_of_join")
    private Date dateOfJoin;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name="fk_manager_id")
    private User manager;

    @OneToMany(mappedBy = "manager")
    private List<User> teamMember;

    @ManyToMany(mappedBy = "users")
    private List<Role> roles;

    @ManyToOne
    @JoinColumn(name="fk_user_department_id")
    private Department department;

    @OneToMany(mappedBy = "createdBy")
    private List<TravelDetail> createdTravelDetails;

    @OneToMany(mappedBy = "user")
    private List<Traveler> travelers;

    @OneToMany(mappedBy = "uploadedBy")
    private List<Document> Documents;


    @OneToMany(mappedBy = "createdBy")
    private List<GameBooking> gameBookingsCreatedByMe;

    @OneToMany(mappedBy = "player")
    private List<GameQueue> gameQueues;

    @ManyToMany(mappedBy = "cancellers")
    private List<GameSlot> cancelledSlots;

    @ManyToMany(mappedBy = "participants")
    private List<GameBooking> gameBookings;


    @ManyToMany(mappedBy = "inerestedPlayers")
    private List<Game> inerestedGames;

}





