package com.roima.HRMS.repos;


import com.roima.HRMS.entites.TravelDetail;
import com.roima.HRMS.entites.Traveler;
import com.roima.HRMS.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface TravelerRepository extends JpaRepository<Traveler,Long> {

  Optional<Traveler> findByUserAndTravelDetail(User user, TravelDetail travelDetail);
  @Query("SELECT t FROM Traveler t LEFT JOIN FETCH t.travelerDocuments LEFT JOIN FETCH t.travelExpenses WHERE t.travelerId=:id")
  Optional<Traveler>findByIdWithAllInfo(@Param("id") Long id);

}


