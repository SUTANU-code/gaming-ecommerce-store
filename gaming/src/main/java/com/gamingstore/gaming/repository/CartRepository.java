package com.gamingstore.gaming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamingstore.gaming.model.Cart;
import com.gamingstore.gaming.model.User;




public interface CartRepository extends JpaRepository<Cart, Long> {

	Optional<Cart>  findByUser(User user);
}
