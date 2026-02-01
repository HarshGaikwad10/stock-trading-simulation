package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.domain.WalletTransactionType;
import com.stocktrading.stock_trading_backend.model.Wallet;
import com.stocktrading.stock_trading_backend.model.WalletTransaction;

import java.util.List;

public interface TransactionService {

    WalletTransaction createTransaction(
            Wallet wallet,
            Long amount,
            String purpose,
            String transferId,
            WalletTransactionType type
    );

    List<WalletTransaction> getWalletTransactions(Wallet wallet);
}
