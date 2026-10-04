package com.gamingstore.gaming.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gamingstore.gaming.dto.AddToCartRequest;
import com.gamingstore.gaming.model.CartItem;
import com.gamingstore.gaming.security.JwtUtil;
import com.gamingstore.gaming.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	 @PostMapping("/add")
	    public ResponseEntity<?> addToCart(
	            @RequestBody AddToCartRequest request,
	            @RequestHeader("Authorization") String token) {

	        String email = extractEmail(token);
	        cartService.addToCart(email, request);

	        return ResponseEntity.ok("Added to cart");
	    }

	    private String extractEmail(String token) {
	        token = token.substring(7);
	        return jwtUtil.extractEmail(token);
	    }
	    
	    @GetMapping
	    public ResponseEntity<?> viewCart(@RequestHeader("Authorization") String token) {

	        String email = extractEmail(token);
	        return ResponseEntity.ok(cartService.viewCart(email));
	    }
	    
	    @DeleteMapping("/remove/{id}")
	    public ResponseEntity<?> remove(@PathVariable Long id) {
	        cartService.removeItem(id);
	        return ResponseEntity.ok("Removed");
	    }


}
