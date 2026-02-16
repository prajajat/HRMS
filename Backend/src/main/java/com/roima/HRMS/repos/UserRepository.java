package com.roima.HRMS.repos;


import com.roima.HRMS.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

        Optional<User> findByCompanyEmail(String companyEmail);
        Optional<User> findByRefreshTokenAndExpiryDateGreaterThan(String refreshToken, LocalDateTime expiryDate);
        List<User> findByRolesTitle(String title);
}