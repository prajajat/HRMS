package com.roima.HRMS.repos;

import com.roima.HRMS.entites.JobRefer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface JobReferRepository  extends JpaRepository<JobRefer,Long> {
}