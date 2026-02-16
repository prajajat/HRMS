package com.roima.HRMS.repos;

import com.roima.HRMS.entites.GameQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameQueueRepository  extends JpaRepository<GameQueue,Long> {
}
