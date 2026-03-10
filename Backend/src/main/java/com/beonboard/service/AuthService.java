package com.beonboard.service;

import com.beonboard.config.JwtUtils;
import com.beonboard.dto.*;
import com.beonboard.entity.User;
import com.beonboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * AuthService is our "Master Chef".
 * It handles the core logic for the Registration and Login of users.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    /**
     * REGISTER logic with OTP:
     */
    public String register(SignupRequest request) {
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // 1. Generate a random 6-digit OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

        // 2. Create and save the "Locked" user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(false); // Locked until OTP is entered
        user.setVerificationCode(otp);

        userRepository.save(user);

        // 3. Send the verification email in the background
        try {
            emailService.sendVerificationEmail(user.getEmail(), user.getName(), otp);
        } catch (Exception e) {
            try (java.io.PrintWriter pw = new java.io.PrintWriter(new java.io.FileWriter("e:/Job Portal/mail_error.txt"))) {
                e.printStackTrace(pw);
            } catch (java.io.IOException ioEx) {
                // Ignore
            }
            e.printStackTrace();
            throw new RuntimeException("Error: Could not send verification email.");
        }

        return "Registration successful! Please check your email for the verification code.";
    }

    /**
     * VERIFY OTP logic:
     */
    public AuthResponse verifyOtp(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        if (user.getVerificationCode().equals(code)) {
            user.setEnabled(true);
            user.setVerificationCode(null); // Clear the code once used
            userRepository.save(user);

            // Now that they are verified, we give them their tokens!
            String accessToken = jwtUtils.generateAccessToken(user.getEmail());
            String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .email(user.getEmail())
                    .name(user.getName())
                    .role(user.getRole().name())
                    .build();
        } else {
            throw new RuntimeException("Invalid Verification Code!");
        }
    }

    /**
     * LOGIN logic (Blocks unverified users):
     */
    public AuthResponse login(LoginRequest request) {
        
        // 1. Find user first to check if they are enabled
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Error: Please verify your email before logging in.");
        }

        // 2. Authenticate
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 3. Generate fresh tokens
        String accessToken = jwtUtils.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .build();
    }

    /**
     * REFRESH TOKEN logic:
     * 1. Check if the Refresh Token is actually real and valid.
     * 2. If it is, issue a BRAND NEW short-lived Access Token.
     */
    public AuthResponse refreshToken(String refreshToken) {
        if (jwtUtils.validateToken(refreshToken)) {
            String email = jwtUtils.getEmailFromToken(refreshToken);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Error: User not found!"));

            // Create a NEW Access Token but keep the old Refresh Token (or rotate it)
            String newAccessToken = jwtUtils.generateAccessToken(user.getEmail());

            return AuthResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(refreshToken)
                    .email(user.getEmail())
                    .name(user.getName())
                    .role(user.getRole().name())
                    .build();
        }
        throw new RuntimeException("Error: Invalid Refresh Token!");
    }
}
