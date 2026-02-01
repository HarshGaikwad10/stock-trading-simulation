package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long> {

}
