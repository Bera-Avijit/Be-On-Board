package com.beonboard.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;
import java.util.List;

/**
 * MongoDB Document representing a Job posting.
 */
@Document(collection = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    private String id;

    private String title;
    private String companyName;
    private String companyLogo;
    private String experienceLevel;
    private String jobType;
    private String location;
    private Double salary;
    private List<String> skills;
    
    // Storing Rich Text Description as a String (HTML)
    private String description;

    private String postedBy; // ID of the Recruiter who posted the job
    private LocalDateTime postedAt;
}
