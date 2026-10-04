package com.gamingstore.gaming.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	   @ManyToOne
	   @JoinColumn(name = "order_id")
	   @JsonBackReference
	    private Order order;

	    @ManyToOne
	    private Product product;

	    private int quantity;

	    private double price;

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public Order getOrder() {
			return order;
		}

		public void setOrder(Order order) {
			this.order = order;
		}

		public Product getProduct() {
			return product;
		}

		public void setProduct(Product product) {
			this.product = product;
		}

		public int getQuantity() {
			return quantity;
		}

		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}

		public double getPrice() {
			return price;
		}

		public void setPrice(double price) {
			this.price = price;
		}

		public OrderItem(long id, Order order, Product product, int quantity, double price) {
			super();
			this.id = id;
			this.order = order;
			this.product = product;
			this.quantity = quantity;
			this.price = price;
		}
		public OrderItem() {
			
		}
	    
}
