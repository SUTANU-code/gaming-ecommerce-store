package com.gamingstore.gaming.security;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gamingstore.gaming.model.User;
import com.gamingstore.gaming.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // ✅ 1. Skip auth endpoints
        if (request.getServletPath().startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ 2. Get Authorization header
        String authHeader = request.getHeader("Authorization");

        // ✅ 3. Validate header format
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // ✅ 4. Extract token
            String token = authHeader.substring(7);

            // ✅ 5. Extract email
            String email = jwtUtil.extractEmail(token);

            // ✅ 6. Check if already authenticated
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // ✅ 7. Validate token
                if (jwtUtil.isTokenValid(token, email)) {

                    // ✅ 8. Fetch user safely
                    Optional<User> optionalUser = userRepository.findByEmail(email);

                    if (optionalUser.isPresent()) {
                        User user = optionalUser.get();

                        // ✅ 9. Set authentication
                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(
                                        user,
                                        null,
                                        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
                                );

                        SecurityContextHolder.getContext().setAuthentication(auth);
                    } else {
                        System.out.println("❌ User not found for email: " + email);
                    }
                }
            }

        } catch (Exception e) {
            System.out.println("❌ JWT ERROR: " + e.getMessage());
        }

        // ✅ 10. Continue filter chain
        filterChain.doFilter(request, response);
    }
}