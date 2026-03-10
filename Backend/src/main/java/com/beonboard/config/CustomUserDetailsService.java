package com.beonboard.config;

import com.beonboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

/**
 * CustomUserDetailsService handles loading user-specific data from the database.
 * Spring Security uses this to verify who is logging in and what their permissions are.
 */
@Configuration
@RequiredArgsConstructor
public class CustomUserDetailsService {

    private final UserRepository userRepository;

    /**
     * This Bean tells Spring Security: "When you need to find a user by their email, 
     * use my UserRepository and look in our Supabase database!"
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .map(user -> new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
                ))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
