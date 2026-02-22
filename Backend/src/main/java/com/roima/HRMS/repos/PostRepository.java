package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom query methods as needed
}
