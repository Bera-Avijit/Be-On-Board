package com.beonboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import org.springframework.security.config.Customizer;
import lombok.RequiredArgsConstructor;

/**
 * The SecurityConfig is the "Main Gate" of our application.
 * It defines the rules for who is allowed to enter which "room" (URL).
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    /**
     * Password Encoder (The Scrambler)
     * We use BCrypt, which is a strong, industry-standard hashing algorithm.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Authentication Manager
     * The core "engine" that handles verifying username and password.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Security Filter Chain (The Rules)
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 🛡️ 1. Enable CORS (Cross-Origin Resource Sharing)
            // This is MANDATORY for React (Port 5173) to talk to Spring Boot (Port 8080).
            .cors(Customizer.withDefaults())
            
            // 🛡️ 2. Disable CSRF
            .csrf(csrf -> csrf.disable())

            // 🛡️ Set Session Management to STATELESS
            // This means the server doesn't "remember" users. Every request must bring its own JWT ticket.
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 🛡️ Define URL Access Rules
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Allow Signup and Login
                .requestMatchers("/api/jobs/create").hasRole("RECRUITER") // Only Recruiters can post
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/jobs/**").permitAll() // Everyone can view jobs
                .anyRequest().authenticated() // Protect ALL other routes
            )
            
/* 
            // 🛡️ Foundation for Google Social Login (OAuth2)
            .oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("/api/auth/oauth2/success") // Where to go after Google confirms identity
            )
            */
            
            // 🛡️ Add our JWT Filter before the standard one!
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * CORS Configuration Source
     * This explicitly tells the browser that requests from localhost:5173 are safe.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://127.0.0.1:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With", "Origin"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L); // Cache CORS pre-flight for 1 hour

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
