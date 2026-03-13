package com.beonboard.service;

import com.beonboard.dto.JobRequest;
import com.beonboard.entity.Job;
import com.beonboard.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public java.util.List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public java.util.Optional<Job> getJobById(String id) {
        return jobRepository.findById(id);
    }

    /**
     * Creates a new job posting from a request.
     * @param request The data from frontend
     * @param recruiterId The ID of the authenticated recruiter
     * @return The saved Job entity
     */
    public Job createJob(JobRequest request, String recruiterId) {
        Job job = Job.builder()
                .title(request.getJobTitle())
                .companyName(request.getCompany())
                .companyLogo(request.getCompanyLogo())
                .experienceLevel(request.getExperience())
                .jobType(request.getJobType())
                .location(request.getLocation())
                .salary(request.getSalary())
                .skills(request.getSkills())
                .description(request.getDescription())
                .postedBy(recruiterId)
                .postedAt(LocalDateTime.now())
                .build();

        return jobRepository.save(job);
    }
}
