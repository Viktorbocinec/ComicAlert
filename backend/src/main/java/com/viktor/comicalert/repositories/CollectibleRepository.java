package com.viktor.comicalert.repositories;

import com.viktor.comicalert.model.Collectible;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectibleRepository extends JpaRepository<Collectible, Long> {
}
