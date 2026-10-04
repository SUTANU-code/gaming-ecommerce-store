package com.gamingstore.gaming.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamingstore.gaming.model.Order;
import com.gamingstore.gaming.model.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get all orders of a specific user
    List<Order> findByUser(User user);
}