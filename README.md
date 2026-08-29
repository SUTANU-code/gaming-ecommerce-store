# 🎮 Gaming E-Commerce Store

[![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

An end-to-end, high-performance full-stack e-commerce platform built for browsing, searching, and purchasing gaming hardware, peripherals, and titles. Built with a robust **Spring Boot** REST backend, a responsive **React** frontend, **MySQL** persistence, and secure **Razorpay** payment gateway integration.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Frontend (React Client)"]
        UI[React UI Dashboard]
        AXIOS[Axios HTTP Client]
        UI --> AXIOS
    end

    subgraph Backend ["Backend (Spring Boot REST API)"]
        AUTH[JWT Authentication Controller]
        STORE[Catalog & Order Controller]
        SERV[Service Layer & Core Logic]
        REPO[Spring Data JPA Repositories]

        AXIOS <-->|HTTPS / JSON| AUTH
        AXIOS <-->|HTTPS / JSON| STORE
        AUTH --> SERV
        STORE --> SERV
        SERV --> REPO
    end

    subgraph External ["Database & Third-Party Services"]
        MYSQL[(MySQL Database)]
        RAZORPAY[Razorpay Payment API]
        SPRING_AI[Spring AI Recommendation Engine]

        REPO <-->|JDBC Driver| MYSQL
        SERV <-->|REST API| RAZORPAY
        SERV <-->|API Key| SPRING_AI
    end
