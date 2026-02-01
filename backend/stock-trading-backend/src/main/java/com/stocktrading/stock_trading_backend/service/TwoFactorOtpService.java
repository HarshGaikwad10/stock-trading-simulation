package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.model.TwoFactorOTP;
import com.stocktrading.stock_trading_backend.model.User;

public interface TwoFactorOtpService {

    TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt);

    TwoFactorOTP findByUser(Long userId);

    TwoFactorOTP findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOtp, String otp);

    void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);

}
