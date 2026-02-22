# HRMS Backend Codebase Overview

## Project Structure

- **Main Entry Point**
  - [`Main.java`](src/main/java/com/roima/HRMS/Main.java): Bootstraps the Spring Boot application and enables scheduling.

- **Configuration**
  - [`Config/Security/`](src/main/java/com/roima/HRMS/Config/Security/): Security configuration, JWT utilities, and CORS setup.
  - [`Config/mapping/`](src/main/java/com/roima/HRMS/Config/mapping/): Likely contains mapping configurations for DTOs and entities.

- **Entities**
  - [`entites/`](src/main/java/com/roima/HRMS/entites/): JPA entities representing database tables, such as:
    - [`User`](src/main/java/com/roima/HRMS/entites/User.java)
    - [`Game`](src/main/java/com/roima/HRMS/entites/Game.java)
    - [`Document`](src/main/java/com/roima/HRMS/entites/Document.java)
    - [`TravelDetail`](src/main/java/com/roima/HRMS/entites/TravelDetail.java)
    - [`Notification`](src/main/java/com/roima/HRMS/entites/Notification.java)
    - ...and others for bookings, slots, roles, permissions, etc.

- **Controllers**
  - [`controllers/`](src/main/java/com/roima/HRMS/controllers/): REST API endpoints for:
    - Authentication ([`AuthController`](src/main/java/com/roima/HRMS/controllers/AuthController.java))
    - Game management ([`GameController`](src/main/java/com/roima/HRMS/controllers/GameController.java))
    - Travel management ([`TravelController`](src/main/java/com/roima/HRMS/controllers/TravelController.java))
    - User management ([`UserController`](src/main/java/com/roima/HRMS/controllers/UserController.java))
    - Job management ([`JobController`](src/main/java/com/roima/HRMS/controllers/JobController.java))

- **DTOs**
  - [`dtos/request/`](src/main/java/com/roima/HRMS/dtos/request/): Request payloads for API endpoints.
  - [`dtos/response/`](src/main/java/com/roima/HRMS/dtos/response/): Response objects for API endpoints.

- **Repositories**
  - [`repos/`](src/main/java/com/roima/HRMS/repos/): Spring Data JPA repositories for database access.

- **Services**
  - [`services/`](src/main/java/com/roima/HRMS/services/): Business logic for games, travel, users, cloud uploads, etc.
    - Example: [`GameService`](src/main/java/com/roima/HRMS/services/GameService.java), [`TravelService`](src/main/java/com/roima/HRMS/services/TravelService.java)

- **Schedulers**
  - [`Schedulers/QueueScheduler.java`](src/main/java/com/roima/HRMS/Schedulers/QueueScheduler.java): Scheduled tasks for slot assignment and cycle updates.

- **Security & Filters**
  - [`filter/JwtAuthenticationFilter.java`](src/main/java/com/roima/HRMS/filter/JwtAuthenticationFilter.java): JWT authentication filter for securing endpoints.
  - [`exception/`](src/main/java/com/roima/HRMS/exception/): Custom exceptions and global exception handling.

- **Utilities**
  - [`util/`](src/main/java/com/roima/HRMS/util/): Utility classes (not detailed here).

- **Resources**
  - [`application.properties`](src/main/resources/application.properties): Application configuration, DB connection, JWT secret, mail, and cloudinary settings.

## Key Features

- **Authentication & Authorization**
  - JWT-based authentication with refresh tokens.
  - Role and permission-based access control.

- **Game Management**
  - Entities and APIs for games, slots, bookings, and queues.
  - Scheduled tasks for automatic slot assignment and cycle management.

- **Travel Management**
  - Entities and APIs for travel details, expenses, documents, and travelers.
  - Expense and document upload with cloud storage integration.

- **User & Notification Management**
  - User profiles, roles, teams, and notifications.

- **Error Handling**
  - Centralized exception handling and custom error responses.

## Technologies Used

- Spring Boot (REST API)
- Spring Data JPA (Database)
- Spring Security (JWT)
- Cloudinary (File uploads)
- SQL Server (Database)
- Lombok (Boilerplate reduction)
- Swagger/OpenAPI (API documentation)

---

For more details, refer to the specific files and packages linked above.