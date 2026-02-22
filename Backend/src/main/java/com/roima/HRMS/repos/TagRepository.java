package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    // Custom query methods as needed
}
