package com.roima.HRMS.repos;

import com.roima.HRMS.entites.TravelDetail;
import com.roima.HRMS.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelDetailRepository extends JpaRepository<TravelDetail,Long> {
    List<TravelDetail> findByCreatedBy(User user);
    List<TravelDetail> findByTravelersUser(User user);

}
