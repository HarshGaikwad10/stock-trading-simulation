package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.domain.WalletTransactionType;
import com.stocktrading.stock_trading_backend.model.Wallet;
import com.stocktrading.stock_trading_backend.model.WalletTransaction;
import com.stocktrading.stock_trading_backend.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Override
    public WalletTransaction createTransaction(
            Wallet wallet,
            Long amount,
            String purpose,
            String transferId,
            WalletTransactionType type
    ) {

        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setAmount(amount);
        transaction.setPurpose(purpose);
        transaction.setTransferId(transferId);
        transaction.setType(type);
        transaction.setDate(LocalDate.now());

        return walletTransactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getWalletTransactions(Wallet wallet) {
        return walletTransactionRepository.findByWalletId(wallet.getId());
    }
}

