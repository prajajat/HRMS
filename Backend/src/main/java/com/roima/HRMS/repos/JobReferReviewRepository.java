package com.roima.HRMS.repos;

import com.roima.HRMS.entities.JobReferReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JobReferReviewRepository  extends JpaRepository<JobReferReview,Long> {
}