package com.roima.HRMS.repos;

import com.roima.HRMS.entities.TravelExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelExpenseRepository extends JpaRepository<TravelExpense,Long>, JpaSpecificationExecutor<TravelExpense> {
}


