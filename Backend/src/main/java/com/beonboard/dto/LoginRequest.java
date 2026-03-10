package com.beonboard.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * LoginRequest DTO
 * Defines what we need when someone tries to sit at the table (Login).
 */
@Data
public class LoginRequest {

    @NotBlank(message = "Email is required to login")
    @Email(message = "Please provide a valid registered email")
    private String email;

    @NotBlank(message = "Password is required to login")
    private String password;

}
