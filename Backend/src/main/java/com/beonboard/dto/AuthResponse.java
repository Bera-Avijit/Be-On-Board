package com.beonboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AuthResponse DTO
 * This is the "Receipt" we send back to the user after a successful Signup or Login.
 * It contains the "Hall Passes" (Tokens) they need for future requests.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String email;
    private String name;
    private String role;
}
