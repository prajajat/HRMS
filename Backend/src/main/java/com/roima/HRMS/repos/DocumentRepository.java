package com.roima.HRMS.repos;

import com.roima.HRMS.entities.Document;
import com.roima.HRMS.entities.TravelExpense;
import com.roima.HRMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long>
{
    List<Document> findByUploadedBy(User uploadedBy);
    List<Document>findAllByTravelExpenseAndOwnerTypeNot(TravelExpense travelExpense,String ownerType);
}
