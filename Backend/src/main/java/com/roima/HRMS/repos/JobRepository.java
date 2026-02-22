package com.roima.HRMS.repos;


import com.roima.HRMS.entites.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobRepository  extends JpaRepository<Job,Long> {
    List<Job> findByStatus(Boolean status);
}