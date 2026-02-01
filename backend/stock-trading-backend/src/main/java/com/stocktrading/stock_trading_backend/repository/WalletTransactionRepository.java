package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

    List<WalletTransaction> findByWalletId(Long walletId);
}
