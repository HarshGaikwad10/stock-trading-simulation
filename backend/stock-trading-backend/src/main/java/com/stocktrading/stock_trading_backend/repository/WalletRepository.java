package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet,Long> {
    Wallet findByUserId(Long userId);
}
