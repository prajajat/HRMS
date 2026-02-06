package com.roima.HRMS.repos;

import com.roima.HRMS.entites.TravelDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelRepository extends JpaRepository<TravelDetail,Long> {

}
