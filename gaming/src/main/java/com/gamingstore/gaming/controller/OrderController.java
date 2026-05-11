package com.gamingstore.gaming.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gamingstore.gaming.dto.OrderResponse;
import com.gamingstore.gaming.model.Order;
import com.gamingstore.gaming.security.JwtUtil;
import com.gamingstore.gaming.service.OrderService;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

	 @Autowired
	    private OrderService orderService;

	    @Autowired
	    private JwtUtil jwtUtil;
	    
	    // ✅ PLACE ORDER
	    @PostMapping("/place")
	    public ResponseEntity<?> placeOrder(@RequestHeader("Authorization") String token) {

	        String email = extractEmail(token);
	        orderService.placeOrder(email);

	        return ResponseEntity.ok("Order placed successfully");
	    }
	    
	    // ✅ VIEW USER ORDERS
	    @GetMapping("/user")
	    public ResponseEntity<?> getUserOrders(@RequestHeader("Authorization") String token) {

	        String email = extractEmail(token);

	        return ResponseEntity.ok(orderService.getOrdersByUser(email));
	    }
	    
	    // ✅ ADMIN: VIEW ALL ORDERS
	    @GetMapping("/all")
	    public ResponseEntity<List<OrderResponse>> getAllOrders() {
	    	 System.out.println(" HIT /api/order/all");
	        return ResponseEntity.ok(orderService.getAllOrders());
	    }
	    
	    @PutMapping("/status/{orderId}")
	    public ResponseEntity<?> updateStatus(
	            @PathVariable Long orderId,
	            @RequestParam String status) {

	        orderService.updateOrderStatus(orderId, status);
	        return ResponseEntity.ok("Order status updated");
	    }

	    private String extractEmail(String token) {
	        token = token.substring(7); // remove "Bearer "
	        return jwtUtil.extractEmail(token);
	    }
}
