package com.beonboard.repository;

import com.beonboard.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Our "Access Key" to the Database.
 * MongoRepository provides us with built-in methods like .save() and .findByEmail().
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    /**
     * Useful for checking if an email is already taken during SignUp.
     */
    boolean existsByEmail(String email);
}
