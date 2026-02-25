package com.roima.HRMS.repos;

import com.roima.HRMS.entities.TravelDetail;
import com.roima.HRMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelDetailRepository extends JpaRepository<TravelDetail,Long> {
    List<TravelDetail> findByCreatedBy(User user);
    List<TravelDetail> findByTravelersUser(User user);

}
