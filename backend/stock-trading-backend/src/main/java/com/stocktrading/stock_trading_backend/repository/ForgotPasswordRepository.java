package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken,String> {

    ForgotPasswordToken findByUserId(Long userId);
}
