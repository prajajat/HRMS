package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    // Custom query methods as needed
}
