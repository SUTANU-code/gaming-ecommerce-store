package com.gamingstore.gaming.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gamingstore.gaming.dto.AuthResponse;
import com.gamingstore.gaming.dto.LoginRequest;
import com.gamingstore.gaming.dto.SignupRequest;
import com.gamingstore.gaming.model.User;
import com.gamingstore.gaming.repository.UserRepository;
import com.gamingstore.gaming.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	
	
	@PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest request){
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
	 public ResponseEntity<?> createAdmin(@RequestBody SignupRequest request) {

	     authService.createAdmin(request);

	     return ResponseEntity.ok("Admin created successfully");
	 }
	 
	
}
