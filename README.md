# 🎓 ScholarshipBD | Scholarship Management Platform

ScholarshipBD is a full-stack scholarship management web application designed to help students discover, apply for, and manage scholarships efficiently. The platform provides role-based dashboards for Admin, Moderator, and Students with secure authentication, payment integration, and server-side data handling.

🔗 Live Website: https://scholarshipbd.vercel.app/

---

## 🚀 Features Overview

### 👨‍🎓 Student Features
- Browse all available scholarships
- Search scholarships by:
  - Scholarship Name
  - University Name
  - Degree
- Filter scholarships by category:
  - Full Fund
  - Partial Fund
- View detailed scholarship information
- Apply for scholarships
- Secure online payment using Stripe
- View application history
- Submit and manage reviews
- Personal dashboard with profile information

---

### 🛠️ Moderator Features
- Review scholarship applications
- Approve or reject applications
- Manage user reviews
- Maintain platform data quality

---

### 🧑‍💼 Admin Features
- Role-based admin dashboard
- Manage users (Admin / Moderator / Student)
- Add, update, and delete scholarships
- Manage all applications
- Monitor payment history
- Remove users completely (Database + Firebase Authentication)
- Secure access using JWT authorization

---

## 🔐 Authentication & Security
- Firebase Authentication for login and registration
- JWT (JSON Web Token) for secure API communication
- Role-based middleware:
  - verifyJWT
  - verifyAdmin
  - verifyModerator
- Firebase Admin SDK used on backend for user management

---

## 💳 Payment System
- Stripe payment gateway integration
- Server-side payment intent creation
- Secure payment processing
- Payment history stored in database

---

## 🔍 Search, Filter & Sort (Server-Side)
- Search by Scholarship Name, University Name, or Degree
- Filter by Scholarship Category (Full Fund / Partial Fund)
- Sort by:
  - Application Fees (Ascending / Descending)
  - Post Date (Newest First)

All operations are handled on the server for better performance and scalability.

---

## 🧱 Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- DaisyUI
- Firebase Authentication
- Axios
- Stripe.js

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Firebase Admin SDK
- Stripe API
- Vercel Serverless Functions

---

## 📁 Developed By

### Abdur Rahman Mamun
🔗 Portfolio: https://armamunsyl.vercel.app/
