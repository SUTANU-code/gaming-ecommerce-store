package com.gamingstore.gaming.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gamingstore.gaming.dto.AuthResponse;
import com.gamingstore.gaming.dto.LoginRequest;
import com.gamingstore.gaming.dto.SignupRequest;
import com.gamingstore.gaming.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private AuthService authService;

    // Admin creation is locked. Set ADMIN_SETUP_KEY on the server to enable it.
    @Value("${app.admin-setup-key:}")
    private String adminSetupKey;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest request) {
        authService.Signup(request);
        return ResponseEntity.ok("user registered sucessfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }

    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(
            @RequestBody SignupRequest request,
            @RequestHeader(value = "X-Admin-Setup-Key", required = false) String key) {

        if (adminSetupKey.isBlank() || !adminSetupKey.equals(key)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden");
        }

        authService.createAdmin(request);

        return ResponseEntity.ok("Admin created successfully");
    }

}
