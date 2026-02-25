package com.roima.HRMS.repos;

import com.roima.HRMS.entities.JobRefer;
import com.roima.HRMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobReferRepository  extends JpaRepository<JobRefer,Long> {
    List<JobRefer> findByReferer(User referer);
}