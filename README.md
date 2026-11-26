# Employee Management System

A full-stack Human Resources management and analytical reporting platform built with **Spring Boot**, **Angular**, and **PostgreSQL**, fully containerized with **Docker Compose**.

---

## Key Features

- **Employee Directory & CRUD Operations:** Create, view, update, and delete employee records with structured validation and clean DTO-to-Entity decoupling.
- **Department & Role Organization:** Categorize employees by department, job title, and employment status with fast filtering and search.
- **Analytical Reporting Dashboard:** Track workforce distribution, headcount metrics, and departmental breakdowns.
- **Layered Backend Architecture:** Built following SOLID principles and Clean Code practices with clear separation across Controller, Service, and Repository layers.
- **Containerized Deployment:** Multi-container orchestration with Docker Compose for seamless local setup and environment consistency.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Java 17, Spring Boot 3.3.4, Spring Data JPA, RESTful APIs |
| **Frontend** | Angular, TypeScript, HTML5, CSS3 |
| **Database** | PostgreSQL 16 |
| **DevOps & Tools** | Docker, Docker Compose, Maven, Postman |

---

## Project Architecture

```text
Employee-Management-System/
├── backend/                  # Spring Boot 3.3.4 REST API
│   ├── src/main/java/        # Controllers, Services, Repositories, DTOs, Entities
│   ├── src/main/resources/   # application.properties / YAML configurations
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                 # Angular SPA
│   ├── src/app/              # Components, Services, Models, Routing
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml        # Multi-container setup (DB + Backend + Frontend)
└── README.md
