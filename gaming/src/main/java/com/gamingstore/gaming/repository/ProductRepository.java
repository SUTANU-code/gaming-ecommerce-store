package com.gamingstore.gaming.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamingstore.gaming.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByActiveTrue();

    List<Product> findByCategoryIgnoreCaseAndActiveTrue(String category);
}
