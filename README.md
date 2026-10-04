# 🎮 GameStore — Gaming E-Commerce Platform

<p align="center">
  <img src="docs/images/homepage.png" alt="GameStore Homepage" width="100%">
</p>

<h3 align="center">
  A full-stack gaming e-commerce platform built with React, Spring Boot, MySQL, JWT Authentication, Razorpay, Docker, and Spring AI.
</h3>

<p align="center">
  <a href="https://gaming-ecommerce-store.vercel.app/">🌐 Live Demo</a>
  &nbsp; • &nbsp;
  <a href="https://github.com/SUTANU-code/gaming-ecommerce-store">💻 Source Code</a>
</p>

---

## 📌 About the Project

**GameStore** is a full-stack gaming e-commerce platform developed to provide a modern online shopping experience for games and gaming accessories.

The application combines a **React frontend** with a **Spring Boot REST API**, **MySQL database**, **JWT-based authentication**, **Razorpay payment integration**, and an **AI-powered product assistant using Spring AI**.

The project demonstrates practical implementation of full-stack software development concepts including authentication, authorization, REST APIs, database persistence, e-commerce workflows, payment processing, AI integration, and deployment.

---

## ✨ Features

### 🛒 E-Commerce

- Browse gaming products
- Product catalog
- Product search
- Category filtering
- Product sorting
- Add products to cart
- Update cart items
- Remove products from cart
- Order management
- Product pricing and descriptions

### 🔐 Authentication & Authorization

- User registration
- User login
- JWT-based authentication
- Spring Security
- Protected REST APIs
- Role-based authorization
- Secure authentication flow

### 💳 Payment Integration

- Razorpay payment integration
- Payment initiation through backend
- Order/payment workflow
- Server-side handling of sensitive payment credentials

### 🤖 AI Product Assistant

- AI-powered product assistance
- Spring AI integration
- Natural-language product interaction
- AI-based assistance for users while browsing the store

### 🎨 Frontend

- Responsive React UI
- Modern gaming-inspired design
- Product cards
- Search interface
- Category filters
- Sorting
- Shopping cart interface
- Authentication pages
- Order interface

### 🐳 DevOps

- Docker support
- Git/GitHub version control
- Vercel frontend deployment
- Spring Boot backend deployment
- Environment-based configuration

---

# 🖥️ Application Preview

<p align="center">
  <img src="docs/images/homepage.png" alt="GameStore Storefront" width="95%">
</p>

The storefront provides a clean interface for discovering games and gaming accessories, searching products, filtering by category, sorting products, and adding products to the shopping cart.

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │                      │
                         │  Store               │
                         │  Login / Register    │
                         │  Cart                │
                         │  Orders              │
                         │  AI Assistant        │
                         └──────────┬───────────┘
                                    │
                              REST API / JSON
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Spring Boot API   │
                         │                      │
                         │  Controllers         │
                         │  Services            │
                         │  Spring Security     │
                         │  JWT Authentication  │
                         │  Spring AI           │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └──────────────┐
                    ▼                                   ▼
          ┌──────────────────┐                ┌──────────────────┐
          │      MySQL       │                │  External APIs   │
          │                  │                │                  │
          │ Users            │                │ Razorpay         │
          │ Products         │                │ AI Provider      │
          │ Cart             │                │                  │
          │ Orders           │                └──────────────────┘
          └──────────────────┘
