package com.gamingstore.gaming.service;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamingstore.gaming.dto.OrderItemResponse;
import com.gamingstore.gaming.dto.OrderResponse;
import com.gamingstore.gaming.enums.OrderStatus;
import com.gamingstore.gaming.model.Cart;
import com.gamingstore.gaming.model.CartItem;
import com.gamingstore.gaming.model.Order;
import com.gamingstore.gaming.model.OrderItem;
import com.gamingstore.gaming.model.User;
import com.gamingstore.gaming.repository.CartItemRepository;
import com.gamingstore.gaming.repository.CartRepository;
import com.gamingstore.gaming.repository.OrderRepository;
import com.gamingstore.gaming.repository.UserRepository;

@Service
public class OrderService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private OrderRepository orderRepository;

	public void placeOrder(String email) {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Cart cart = cartRepository.findByUser(user)
	            .orElseThrow(() -> new RuntimeException("Cart is empty"));

	    List<CartItem> cartItems = cartItemRepository.findByCart(cart);

	    Order order = new Order();
	    order.setUser(user);
	    order.setStatus(OrderStatus.PLACED); 

	    double total = 0;

	    List<OrderItem> orderItems = new ArrayList<>();

	    for (CartItem item : cartItems) {

	        OrderItem oi = new OrderItem();
	        oi.setOrder(order);
	        oi.setProduct(item.getProduct());
	        oi.setQuantity(item.getQuantity());
	        oi.setPrice(item.getProduct().getPrice());

	        total += item.getQuantity() * item.getProduct().getPrice();

	        orderItems.add(oi);
	    }

	    order.setItems(orderItems);
	    order.setTotalAmount(total);

	    orderRepository.save(order);

	    // Clear cart after order
	    cartItemRepository.deleteAll(cartItems);
	}

	public List<OrderResponse> getOrdersByUser(String email) {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    List<Order> orders = orderRepository.findByUser(user);

	    return orders.stream().map(order -> {

	        List<OrderItemResponse> itemResponses = order.getItems().stream()
	                .map(item -> new OrderItemResponse(
	                        item.getProduct().getName(),
	                        item.getProduct().getPrice(),
	                        item.getQuantity()
	                ))
	                .toList();

	        return new OrderResponse(
	                order.getId(),
	                order.getTotalAmount(),
	                order.getStatus().name(),
	                itemResponses
	        );

	    }).toList();
	}

	public List<OrderResponse> getAllOrders() {

	    List<Order> orders = orderRepository.findAll();

	    return orders.stream().map(order -> {

	        List<OrderItemResponse> itemResponses = order.getItems().stream()
	                .map(item -> new OrderItemResponse(
	                        item.getProduct().getName(),
	                        item.getProduct().getPrice(),
	                        item.getQuantity()
	                ))
	                .toList();

	        return new OrderResponse(
	                order.getId(),
	                order.getTotalAmount(),
	                order.getStatus().name(), // ENUM safe
	                itemResponses
	        );

	    }).toList();
	}

	public void updateOrderStatus(Long orderId, String status) {

	    // 1. Find Order
	    Order order = orderRepository.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    // 2. Convert String → ENUM (VERY IMPORTANT)
	    OrderStatus newStatus;
	    try {
	        newStatus = OrderStatus.valueOf(status.toUpperCase());
	    } catch (IllegalArgumentException e) {
	        throw new RuntimeException("Invalid status value");
	    }

	    // 3. Update status
	    order.setStatus(newStatus);

	    // 4. Save
	    orderRepository.save(order);
	}}