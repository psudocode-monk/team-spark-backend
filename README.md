# Backend: Sparking Local Tourism with Tech

## Project Overview

This is the backend for **Sparking Local Tourism with Tech**, a comprehensive MERN-stack application designed to connect tourists with local tour agents. This backend manages all core functionalities, including user authentication, trip management, booking processes, secure payments, community engagement, and emergency services. It's built with a **role-based architecture** to serve the unique needs of tourists (Users), tour agents, and administrators.

-----

## Tech Stack

  * **Node.js**: The JavaScript runtime environment for building the server.
  * **Express.js**: A fast, unopinionated web framework for Node.js.
  * **MongoDB**: A NoSQL document database for storing application data.
  * **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
  * **JSON Web Tokens (JWT)**: Used for secure, stateless authentication.
  * **bcrypt**: A library for hashing user passwords securely.
  * **Stripe / Razorpay**: Payment gateway integration for handling secure transactions.
  * **GPS / SOS API**: Integrates with a third-party service for live location tracking and emergency alerts.

-----

## Folder Structure

The backend follows a standard, organized structure for clarity and maintainability.

```
/sparking-local-tourism-backend
├── /config/             # Configuration files (e.g., database connection)
├── /controllers/        # Business logic for handling requests
├── /middlewares/        # Custom middleware for auth, error handling, etc.
├── /models/             # Mongoose schemas for data models
├── /node_modules/       # Project dependencies
├── /routes/             # API endpoints and route definitions
├── /utils/              # Utility functions (e.g., helpers, API error classes)
├── .env                 # Environment variables
├── .gitignore           # Files to be ignored by Git
├── package.json         # Project metadata and dependencies
└── server.js            # Main application entry point
```

-----

## Installation & Setup

Follow these steps to get the backend running locally.

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd sparking-local-tourism-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create and configure the `.env` file:**
    Create a new file named `.env` in the root directory and add the following environment variables. Replace the placeholders with your actual values.

    ```
    PORT=5000
    NODE_ENV=development
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
    JWT_SECRET=a_very_secure_and_long_jwt_secret
    JWT_EXPIRE=30d
    STRIPE_SECRET_KEY=sk_test_... # Or RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
    SOS_API_KEY=your_gps_sos_api_key
    ```

4.  **Run the application:**

      * **Development:**
        ```bash
        npm run dev
        ```
      * **Production:**
        ```bash
        npm start
        ```

-----

## Key Features

  * **Secure Authentication**: Uses **JWT** for token-based authentication, ensuring every API call is authenticated and authorized.
  * **Robust Booking Flow**: Manages the entire booking lifecycle from selection and wishlist to payment confirmation and receipt generation.
  * **Community Engagement**: Allows users to share their travel experiences, fostering a vibrant community.
  * **Emergency SOS**: A critical feature that alerts shared contacts and the nearest authorities in an emergency.
  * **Agent Verification**: A streamlined admin process to verify new agents using official documents, maintaining trust and safety on the platform.
  * **Role-Based Access Control**: Ensures that users, agents, and admins can only access endpoints and data relevant to their role.

-----

## Security Measures

  * **JWT Authentication**: Ensures requests are from authenticated users and prevents unauthorized access.
  * **Password Hashing**: User passwords are never stored in plain text. **bcrypt** is used to hash passwords before storing them in the database.
  * **Role-Based Access Control**: Middleware checks the user's role before allowing access to specific routes (e.g., an agent cannot access admin routes).
  * **Input Validation**: All incoming data is validated to prevent common attacks like injection.

-----

## Future Enhancements

  * **Microservices Architecture**: Refactor the monolithic backend into smaller, independent services (e.g., separate services for Payments, Bookings, and SOS) for better scalability and resilience.
  * **AI Itinerary Engine**: Integrate an AI model that can generate personalized trip itineraries based on user preferences and booking history.
  * **Caching with Redis**: Implement Redis caching for frequently accessed data (e.g., trip listings, popular posts) to significantly reduce database load and improve response times.

-----

## License

This project is licensed under the **MIT License** - see the `LICENSE` file for details.
