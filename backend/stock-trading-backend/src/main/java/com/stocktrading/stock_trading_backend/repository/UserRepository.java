package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
