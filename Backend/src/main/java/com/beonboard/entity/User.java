package com.beonboard.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

/**
 * MongoDB Document representing a User in our Job Portal.
 */
@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id; // MongoDB IDs are naturally Strings (ObjectIds)

    private String name;

    @Indexed(unique = true) 
    private String email;

    private String password;

    private UserRole role;

    @Builder.Default
    private boolean enabled = false;

    private String verificationCode;
    
}
