package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.domain.VerificationType;
import com.stocktrading.stock_trading_backend.model.ForgotPasswordToken;
import com.stocktrading.stock_trading_backend.model.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user, String otp, VerificationType verificationType, String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);
}
