package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Job;
import com.roima.HRMS.entites.JobShare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface JobShareRepository  extends JpaRepository<JobShare,Long> {
}