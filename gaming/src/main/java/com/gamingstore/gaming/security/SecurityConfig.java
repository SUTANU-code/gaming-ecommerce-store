package com.gamingstore.gaming.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http
    	 .cors(cors -> {})  
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth

        		  .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        	    // 🔓 PUBLIC
        	    .requestMatchers("/api/auth/**").permitAll()
        	    .requestMatchers("/error").permitAll()
        	    .requestMatchers("/api/ai/**").permitAll()
        	    .requestMatchers("/api/payment/**").permitAll()
        	    .requestMatchers("/api/auth/create-admin").permitAll()
        	    

        	    // 🛍️ PRODUCTS
        	    .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
        	    .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
        	    .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
        	    .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")

        	    // 🛒 CART (USER)
        	    .requestMatchers("/api/cart/**").hasRole("USER")

        	    // 📦 ORDER USER APIs
        	    .requestMatchers(HttpMethod.POST, "/api/order/place").hasRole("USER")
        	    .requestMatchers(HttpMethod.GET, "/api/order/user").hasRole("USER")

        	    // 🔥 ADMIN ORDER APIs (KEEP ABOVE any generic order rules)
        	    .requestMatchers(HttpMethod.GET, "/api/order/all").hasRole("ADMIN")
        	    .requestMatchers(HttpMethod.PUT, "/api/order/status/**").hasRole("ADMIN")

        	    // fallback
        	    .anyRequest().authenticated()
        	)
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}