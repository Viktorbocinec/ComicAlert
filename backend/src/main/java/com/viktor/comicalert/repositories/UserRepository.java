package com.viktor.comicalert.repositories;

import com.viktor.comicalert.model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);
}
