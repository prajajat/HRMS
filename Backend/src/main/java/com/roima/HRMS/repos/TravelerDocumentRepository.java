package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Document;
import com.roima.HRMS.entites.Traveler;
import com.roima.HRMS.entites.TravelerDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TravelerDocumentRepository  extends JpaRepository<TravelerDocument,Long> {

    List<TravelerDocument> findByDocumentAndVisibility(Document document, String visibility);
    List<TravelerDocument> findByDocumentAndVisibilityAndTraveler(Document document, String visibility, Traveler traveler);
    List<TravelerDocument> findByTraveler(Traveler traveler);

}
