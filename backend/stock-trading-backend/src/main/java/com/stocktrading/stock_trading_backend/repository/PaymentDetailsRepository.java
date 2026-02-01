package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails,Long> {
     PaymentDetails findByUserId(Long userId);
}
