package com.beonboard.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

/**
 * JwtUtils is our "Key Maker".
 * It handles generating, parsing, and validating JSON Web Tokens (JWT).
 * We support two types of tokens:
 * 1. Access Token: Short-lived (e.g., 15 mins) for every request.
 * 2. Refresh Token: Long-lived (e.g., 7 days) to get a new Access Token without re-logging.
 */
@Component
public class JwtUtils {

    @Value("${JWT_SECRET_VAL}")
    private String jwtSecret;

    @Value("${JWT_ACCESS_EXPIRY}")
    private long jwtExpirationMs;

    @Value("${JWT_REFRESH_EXPIRY}")
    private long jwtRefreshExpirationMs;

    /**
     * Get the signing key from the secret string.
     * Modern JJWT (0.12+) requires a SecretKey object.
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generate a Short-lived Access Token.
     */
    public String generateAccessToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Generate a Long-lived Refresh Token.
     */
    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtRefreshExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extract the email (subject) from the token.
     */
    public String getEmailFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Generic method to extract any piece of data (claim) from the token.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Validate if the token is authentic and not expired.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token is either tampered with, expired, or malformed
            return false;
        }
    }
}
