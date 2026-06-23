package com.gamingstore.gaming.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import com.gamingstore.gaming.dto.ProductRequest;
import com.gamingstore.gaming.dto.ProductResponse;
import com.gamingstore.gaming.model.Product;
import com.gamingstore.gaming.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	// ADD PRODUCT (ADMIN) — clears cache so new product appears
	@CacheEvict(value = "products", allEntries = true)
	public ProductResponse addProduct(ProductRequest request) {
	    Product product = new Product();
	    product.setName(request.getName());
	    product.setBrand(request.getBrand());
	    product.setCategory(request.getCategory());
	    product.setDescription(request.getDescription());
	    product.setPrice(request.getPrice());
	    product.setStock(request.getStock());
	    product.setImageUrl(request.getImageUrl());
	    product.setCreatedAt(LocalDateTime.now());
	    product.setActive(true);
	    Product saved = productRepository.save(product);
	    return mapToResponse(saved);
	}
	
	// GET ALL PRODUCTS (PUBLIC) — cached ✅
	@Cacheable("products")
    public List<ProductResponse> getAllProducts() {
    	return productRepository.findByActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    
    // GET BY ID — cached per id ✅
	@Cacheable(value = "product", key = "#id")
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToResponse(product);
    }
    
    // FILTER BY CATEGORY — cached per category ✅
	@Cacheable(value = "productsByCategory", key = "#category")
    public List<ProductResponse> getByCategory(String category) {
        return productRepository
                .findByCategoryIgnoreCaseAndActiveTrue(category)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    
    // UPDATE PRODUCT (ADMIN) — clears all caches ✅
	@CacheEvict(value = {"products", "product", "productsByCategory"}, allEntries = true)
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(request.getImageUrl());
        Product updated = productRepository.save(product);
        return mapToResponse(updated);
    }
    
    // DELETE PRODUCT (ADMIN) — clears all caches ✅
	@CacheEvict(value = {"products", "product", "productsByCategory"}, allEntries = true)
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setActive(false);
        productRepository.save(product);
    }

	private ProductResponse mapToResponse(Product product) {
		return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getBrand(),
                product.getCategory(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl()
        );
	}
}