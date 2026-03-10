package com.beonboard.dto;

import com.beonboard.entity.UserRole;
import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * SignupRequest DTO (Data Transfer Object)
 * This is the "blueprint" of the incoming JSON during registration.
 * We use Jakarta Validation here to enforce strict security rules.
 */
@Data
public class SignupRequest {

    @NotBlank(message = "Name cannot be empty")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
        regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
        message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    private String password;

    @NotNull(message = "Please select a role (CANDIDATE or RECRUITER)")
    private UserRole role;

}
