package com.beonboard.controller;

import com.beonboard.dto.AuthResponse;
import com.beonboard.dto.LoginRequest;
import com.beonboard.dto.SignupRequest;
import com.beonboard.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController is our "Waiter".
 * It takes requests from the Frontend (React) and communicates 
 * with the AuthService (Chef) to deliver the results.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allows your React app to talk to this API
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint for User Registration.
     * @Valid ensures the SignupRequest follows our validation rules (Email, Password strength).
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * Endpoint for Email Verification via OTP.
     */
    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verify(@RequestBody java.util.Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        return ResponseEntity.ok(authService.verifyOtp(email, code));
    }

    /**
     * Endpoint for User Login.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Endpoint to Refresh the Access Token. 
     * Uses the long-lived refresh token to give the user a new temporary access token.
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody java.util.Map<String, String> request) {
        String token = request.get("refreshToken");
        return ResponseEntity.ok(authService.refreshToken(token));
    }
}
