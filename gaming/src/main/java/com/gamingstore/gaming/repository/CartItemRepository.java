package com.gamingstore.gaming.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamingstore.gaming.model.Cart;
import com.gamingstore.gaming.model.CartItem;
import java.util.List;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  List<CartItem> findByCart(Cart cart);
}
