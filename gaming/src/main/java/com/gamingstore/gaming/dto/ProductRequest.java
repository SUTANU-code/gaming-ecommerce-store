package com.gamingstore.gaming.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String brand;

    @NotBlank
    private String category;

    private String description;
    private double price;
    private int stock;
    private String imageUrl;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public ProductRequest(@NotBlank String name, @NotBlank String brand, @NotBlank String category, String description,
			double price, int stock, String imageUrl) {
		super();
		this.name = name;
		this.brand = brand;
		this.category = category;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.imageUrl = imageUrl;
	}
    
}