package com.roima.HRMS.repos;

import com.roima.HRMS.entities.JobShare;
import com.roima.HRMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobShareRepository  extends JpaRepository<JobShare,Long> {

    List<JobShare> findBySender(User sender);
}