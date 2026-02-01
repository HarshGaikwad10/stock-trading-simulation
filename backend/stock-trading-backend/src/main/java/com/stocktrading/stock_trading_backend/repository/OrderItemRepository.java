package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
