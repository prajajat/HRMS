package com.roima.HRMS.repos;

import com.roima.HRMS.entites.TravelExpense;
import com.roima.HRMS.entites.Traveler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelExpenseRepository extends JpaRepository<TravelExpense,Long> {
}


