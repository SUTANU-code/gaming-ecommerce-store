package com.gamingstore.gaming.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamingstore.gaming.model.Cart;
import com.gamingstore.gaming.model.CartItem;
import com.gamingstore.gaming.model.Product;

import java.util.List;
import java.util.Optional;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  List<CartItem> findByCart(Cart cart);
  Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
