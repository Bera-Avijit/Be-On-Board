package com.beonboard.controller;

import com.beonboard.dto.JobRequest;
import com.beonboard.entity.Job;
import com.beonboard.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("/all")
    public ResponseEntity<java.util.List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable String id) {
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Endpoint to create a new job posting.
     * Only accessible by Recruiters (enforced in SecurityConfig).
     */
    @PostMapping("/create")
    public ResponseEntity<?> createJob(@RequestBody JobRequest request, Authentication authentication) {
        try {
            // Get the recruiter's email/id from the authentication object (from JWT)
            String recruiterEmail = authentication.getName();
            
            Job savedJob = jobService.createJob(request, recruiterEmail);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Job posted successfully!");
            response.put("jobId", savedJob.getId());
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to post job: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
