# Stock Trading Simulation Platform

A full-stack stock trading simulation platform that allows users to view market data, manage a virtual wallet, place buy/sell orders, track their portfolio, and maintain a watchlist.  
This project is built for **learning and demonstration purposes** and does not involve real trading.

---

## 📌 Project Overview

The Stock Trading Simulation Platform simulates the core functionality of a real-world trading application. Users can register, authenticate securely, explore market data, manage a virtual wallet, and simulate stock trades without financial risk.

The application integrates external APIs for market data and supports test-mode payment integration to demonstrate wallet top-up functionality.

---

## ✨ Features

- User authentication and authorization using JWT
- Virtual wallet management
- Simulated buy and sell stock transactions
- Portfolio and transaction history tracking
- Watchlist functionality
- Market data integration using CoinGecko API
- Razorpay payment integration (Test Mode)
- Secure REST APIs with Spring Security

---

## 🛠️ Tech Stack

### Frontend
- React
- Redux
- Tailwind CSS
- shadcn/ui

### Backend
- Spring Boot
- Spring Security
- JWT Authentication

### Database
- MongoDB (primary data storage)
- MySQL (transactional data)

### External Services
- CoinGecko API (market data)
- Razorpay (payments – test mode only)

---

## 💳 Payments Note (Important)

⚠️ Razorpay is integrated **only in Test Mode**.  
No real money transactions are performed.

- Netbanking and UPI are supported in test mode
- Card payments may be restricted due to Razorpay test-mode account limitations

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js & npm
- MongoDB
- MySQL
- Git

---

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/harshgaikwad/stock-trading-simulation.git
