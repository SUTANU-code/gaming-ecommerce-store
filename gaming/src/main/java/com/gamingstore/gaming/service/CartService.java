package com.gamingstore.gaming.service;

import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamingstore.gaming.dto.AddToCartRequest;
import com.gamingstore.gaming.dto.CartResponse;
import com.gamingstore.gaming.model.Cart;
import com.gamingstore.gaming.model.CartItem;
import com.gamingstore.gaming.model.Product;
import com.gamingstore.gaming.model.User;
import com.gamingstore.gaming.repository.CartItemRepository;
import com.gamingstore.gaming.repository.CartRepository;
import com.gamingstore.gaming.repository.ProductRepository;
import com.gamingstore.gaming.repository.UserRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	//ADD TO CART
	public void addToCart(String email, AddToCartRequest request) {
		
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));
		
		Cart cart = cartRepository.findByUser(user)
				.orElseGet(()->{
					Cart newCart = new Cart();
					newCart.setUser(user);
					return cartRepository.save(newCart);
				});
				
		Product product = productRepository.findById(request.getProductId())
				.orElseThrow(() -> new RuntimeException( "product not found"));
		
		CartItem item = new CartItem();
		item.setCart(cart);
		item.setProduct(product);
		item.setQuantity(request.getQuantity());
		
		cartItemRepository.save(item);
	}
	
	// VIEW CART
	public List<CartResponse> viewCart(String email){

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Cart cart = cartRepository.findByUser(user)
	            .orElseThrow(() -> new RuntimeException("Cart empty"));

	    List<CartItem> items = cartItemRepository.findByCart(cart);

	    return items.stream()
	            .map(item -> new CartResponse(
	                    item.getProduct().getId(),
	                    item.getProduct().getName(),
	                    item.getQuantity(),
	                    item.getProduct().getPrice()
	            ))
	            .toList();
	}
	
	// REMOVE ITEM
    public void removeItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }
	
}
