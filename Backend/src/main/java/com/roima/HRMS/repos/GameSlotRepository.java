package com.roima.HRMS.repos;

import com.roima.HRMS.entites.GameSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameSlotRepository  extends JpaRepository<GameSlot,Long> {
}
