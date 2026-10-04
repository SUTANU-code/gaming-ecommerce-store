package com.gamingstore.gaming.service;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gamingstore.gaming.dto.AuthResponse;
import com.gamingstore.gaming.dto.LoginRequest;
import com.gamingstore.gaming.dto.SignupRequest;
import com.gamingstore.gaming.model.User;
import com.gamingstore.gaming.repository.UserRepository;
import com.gamingstore.gaming.security.JwtUtil;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private  JwtUtil jwtUtil;
	
	public void Signup(SignupRequest request) {
		if(userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email Already Exists");
		}
		

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
    }
	
	public AuthResponse login(LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("Invalid credentials"));
		
		if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new RuntimeException("invalid credentials!");
		}
		
		String token = jwtUtil.generateToken(user.getEmail());
		return new AuthResponse(token, user.getRole());
		
	}

	public void createAdmin(SignupRequest request) {

	    if (userRepository.existsByEmail(request.getEmail())) {
	        throw new RuntimeException("Email already exists");
	    }

	    User user = new User();
	    user.setName(request.getName());
	    user.setEmail(request.getEmail());
	    user.setPassword(passwordEncoder.encode(request.getPassword())); // ✅ important
	    user.setRole("ADMIN");
	    user.setCreatedAt(LocalDateTime.now());

	    userRepository.save(user);
	}
}
