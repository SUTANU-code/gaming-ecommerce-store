package com.gamingstore.gaming.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gamingstore.gaming.dto.ProductRequest;
import com.gamingstore.gaming.dto.ProductResponse;
import com.gamingstore.gaming.service.ProductService;

@RestController
@RequestMapping("/api/products")

public class ProductController {
	
	@Autowired
	private ProductService productservice;
	
	 // ADMIN → ADD PRODUCT
	@PostMapping
	public ResponseEntity<ProductResponse> addProduct(@RequestBody ProductRequest request){
		return ResponseEntity.ok(productservice.addProduct(request));
		
	}
	
	 // PUBLIC → GET ALL
    @GetMapping
    public List<ProductResponse> getAll() {
        return productservice.getAllProducts();
    }
    
    // PUBLIC → GET BY ID
    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id) {
        return productservice.getProductById(id);
    }
    
    // PUBLIC → FILTER
    @GetMapping("/category/{category}")
    public List<ProductResponse> getByCategory(@PathVariable String category) {
        return productservice.getByCategory(category);
    }
    
    // ADMIN → UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {

        return ResponseEntity.ok(productservice.updateProduct(id, request));
    }
    
    // ADMIN → DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        productservice.deleteProduct(id);
        return ResponseEntity.ok("Deleted successfully");
    }

}
