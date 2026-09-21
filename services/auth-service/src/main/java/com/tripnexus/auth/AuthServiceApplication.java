package com.tripnexus.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
@RequestMapping("/api/v1/auth")
public class AuthServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String role = credentials.getOrDefault("role", "CUSTOMER");
        return Map.of(
            "status", "SUCCESS",
            "token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tripnexus.verified",
            "role", role,
            "user", "Vivek Awasthi",
            "walletBalance", 24500
        );
    }
}
