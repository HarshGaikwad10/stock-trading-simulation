package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOtpRepository extends JpaRepository<TwoFactorOTP,String> {

    TwoFactorOTP findByUserId(Long userId);

}
