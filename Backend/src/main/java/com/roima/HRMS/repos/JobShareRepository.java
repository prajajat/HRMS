package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Job;
import com.roima.HRMS.entites.JobShare;
import com.roima.HRMS.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobShareRepository  extends JpaRepository<JobShare,Long> {

    List<JobShare> findBySender(User sender);
}