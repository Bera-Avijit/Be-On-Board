package com.beonboard.repository;

import com.beonboard.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Job document operations.
 */
@Repository
public interface JobRepository extends MongoRepository<Job, String> {
    // Basic CRUD inherited from MongoRepository
}
