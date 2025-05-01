# 🧩 Taskmate Backend

A simple and scalable Node.js backend API for managing user authentication with email OTP verification using Express, MongoDB, and JWT.

---

## 🚀 Features

- User Signup with email OTP verification
- Secure login with JWT token
- MongoDB integration via Mongoose
- Password hashing using bcrypt
- Email service integration via Nodemailer
- Environment variable support via dotenv

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JWT, bcrypt
- **Email Service**: Nodemailer (Gmail SMTP)
- **Environment Variables**: dotenv

---

## 📁 Project Structure

project-root/
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── utils/
│   └── sendEmail.js
├── .env
├── server.js


---

## 🧪 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/taskmate-backend.git
cd taskmate-backend


PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secure_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password


