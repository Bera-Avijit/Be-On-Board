package com.beonboard.dto;

import lombok.Data;
import java.util.List;

/**
 * Data Transfer Object for receiving job creation requests from the Frontend.
 */
@Data
public class JobRequest {
    private String jobTitle;      // Mapping to frontend 'jobTitle'
    private String company;       // Mapping to frontend 'company'
    private String companyLogo;   // Mapping to frontend 'companyLogo'
    private String experience;    // Mapping to frontend 'experience'
    private String jobType;       // Mapping to frontend 'jobType'
    private String location;      // Mapping to frontend 'location'
    private Double salary;        // Mapping to frontend 'salary'
    private List<String> skills;  // Mapping to frontend 'skills'
    private String description;   // Mapping to frontend 'description'
}
