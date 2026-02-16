package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Document;
import com.roima.HRMS.entites.TravelExpense;
import com.roima.HRMS.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long>
{
    List<Document> findByUploadedBy(User uploadedBy);
    List<Document>findAllByTravelExpense(TravelExpense travelExpense);
}
