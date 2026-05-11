package com.gamingstore.gaming.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gamingstore.gaming.enums.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders") 
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	private User user;
	
	private double totalAmount;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	 @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	 @JsonManagedReference
	    private List<OrderItem> items;

	
	 
	 public Long getId() {
		return id;
	}



	 public void setId(Long id) {
		 this.id = id;
	 }



	 public User getUser() {
		 return user;
	 }



	 public void setUser(User user) {
		 this.user = user;
	 }



	 public double getTotalAmount() {
		 return totalAmount;
	 }



	 public void setTotalAmount(double totalAmount) {
		 this.totalAmount = totalAmount;
	 }



	 public OrderStatus getStatus() {
		 return status;
	 }



	 public void setStatus(OrderStatus status) {
		 this.status = status;
	 }



	 public List<OrderItem> getItems() {
		 return items;
	 }



	 public void setItems(List<OrderItem> items) {
		 this.items = items;
	 }



	 public Order(Long id, User user, double totalAmount, OrderStatus status, List<OrderItem> items) {
		super();
		this.id = id;
		this.user = user;
		this.totalAmount = totalAmount;
		this.status = status;
		this.items = items;
	}



	 public Order() {
		 
	 }
	 
	 }
