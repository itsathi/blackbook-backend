# Auth App

This project is a Node.js application that implements a user and admin authentication system using JWT (JSON Web Tokens) and bcrypt for password hashing. It includes features for user registration, login, and logout, as well as admin registration and logout.

## Project Structure

```
auth-app
├── controllers
│   ├── Authcontroller.js       # Handles user authentication
│   └── Admincontroller.js      # Handles admin authentication
├── db
│   └── connect.js              # MongoDB connection setup
├── middlewares
│   ├── AuthValidation.js       # Input validation for authentication
│   └── AuthMiddleware.js       # Middleware for JWT verification
├── Models
│   ├── Usermodel.js            # User schema definition
│   └── Adminmodel.js           # Admin schema definition
├── Routes
│   ├── Authrouter.js           # User authentication routes
│   └── Adminrouter.js          # Admin authentication routes
├── .env                         # Environment variables
├── index.js                    # Entry point of the application
├── package.json                 # Project dependencies and scripts
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd auth-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file:**
   Copy the `.env.example` file to `.env` and update the values with your MongoDB connection string and JWT secret.

4. **Run the application:**
   ```
   npm start
   ```

## Usage

- **User Registration:** Send a POST request to `/auth/register` with user details (name, email, password).
- **User Login:** Send a POST request to `/auth/login` with email and password.
- **User Logout:** Send a POST request to `/auth/logout` to log out the user.
- **Admin Registration:** Send a POST request to `/admin/register` with admin details.
- **Admin Logout:** Send a POST request to `/admin/logout` to log out the admin.

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `bcrypt`: Library to hash passwords
- `jsonwebtoken`: Library to work with JWT
- `express-validator`: Middleware for validating request data
- `dotenv`: Module to load environment variables from a `.env` file

## License

This project is licensed under the MIT License.