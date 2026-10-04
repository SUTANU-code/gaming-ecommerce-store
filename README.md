# 🎮 GameStore — Gaming E-Commerce Platform

<p align="center">
  <strong>A full-stack gaming e-commerce platform built with React, Spring Boot, MySQL, JWT Authentication, Razorpay, Docker, and Spring AI.</strong>
</p>

<p align="center">
  <a href="https://gaming-ecommerce-store.vercel.app/">🌐 Live Demo</a>
  &nbsp; • &nbsp;
  <a href="https://github.com/SUTANU-code/gaming-ecommerce-store">💻 Source Code</a>
</p>

---

## 📌 About the Project

**GameStore** is a full-stack gaming e-commerce platform designed to provide a modern online shopping experience for games and gaming accessories.

The application combines a **React frontend** with a **Spring Boot REST API**, **MySQL database**, **JWT-based authentication**, **Razorpay payment integration**, and an **AI-powered product assistant using Spring AI**.

The project demonstrates practical full-stack development concepts including authentication, authorization, REST APIs, database persistence, e-commerce workflows, payment processing, AI integration, Docker, and cloud deployment.

---

## ✨ Features

### 🛒 E-Commerce

- Product catalog
- Browse games and gaming accessories
- Product search
- Category filtering
- Product sorting
- Add products to cart
- Update cart items
- Remove cart items
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
- Backend-driven payment workflow
- Order/payment processing
- Sensitive payment credentials kept on the backend

### 🤖 AI Product Assistant

- AI-powered product assistance
- Spring AI integration
- Natural-language interaction
- AI assistance for product-related questions

### 🎨 Frontend

- React-based user interface
- Responsive design
- Gaming-focused UI
- Product cards
- Search interface
- Category filters
- Sorting
- Shopping cart
- Authentication pages
- Order interface

### 🐳 DevOps

- Docker support
- Git and GitHub
- Vercel frontend deployment
- Spring Boot backend deployment
- Environment-based configuration

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
                         └───────┬────────┬─────┘
                                 │        │
                    ┌────────────┘        └──────────────┐
                    ▼                                    ▼
          ┌──────────────────┐                ┌──────────────────┐
          │      MySQL       │                │  External APIs   │
          │                  │                │                  │
          │ Users            │                │ Razorpay         │
          │ Products         │                │ AI Provider      │
          │ Cart             │                │                  │
          │ Orders           │                └──────────────────┘
          └──────────────────┘
