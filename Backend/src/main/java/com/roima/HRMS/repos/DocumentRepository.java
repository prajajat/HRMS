package com.roima.HRMS.repos;

import com.roima.HRMS.entites.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long>
{
}
