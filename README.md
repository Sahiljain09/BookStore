# BookSpot  

**BookSpot** is a fully functional eCommerce web application designed for seamless book purchases. It offers a user-friendly interface, efficient order management, and scalable performance to handle high traffic.  

## Features  
- **User Functionality:**  
  - Browse and search books.  
  - Add books to the cart and wishlist.  
  - Check out with Razorpay payment integration.  

- **Admin Panel:**  
  - Real-time order management and status updates.  
  - Bulk book addition for efficient inventory handling.  

- **Performance:**  
  - Scalable to handle 1,000+ concurrent users.  
  - Optimised for seamless user navigation and minimal latency.  

## Tech Stack  
- **Frontend:** ReactJS, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Payment Gateway:** Razorpay  

## Deployment  
- Hosted on Vercel: [BookSpot Live Demo](https://book-store-frontend-mauve.vercel.app)  

## Local Development Setup

Follow these instructions to get the project running on your local machine.

### Prerequisites

-   Node.js is installed on your machine.
-   MongoDB instance (local or cloud-based like MongoDB Atlas).
-   Git installed.

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/Sahiljain09/BookStore.git
cd BookStore
```

### 2. Install dependencies in both the frontend and backend folders separately:
```bash
npm install
```  

### 3. Create an environment file by copying the example file in both the frontend and backend.

```bash
copy .env.example .env
```  

### 4. Run the application:
Start the backend server:
```bash
npm start
```  
Start the frontend:
```bash
npm run dev
```  

4. Access the app locally at `http://localhost:3000`.  

## Contributing  
Feel free to submit issues or pull requests to improve the application.  
