package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.model.Order;
import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.model.Wallet;


public interface WalletService {
    Wallet getUserWallet(User user);
    Wallet addBalance(Wallet wallet, Long money);
    Wallet findWalletById(Long id) throws Exception;
    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet,Long amount) throws Exception;
    Wallet payOrderPayment(Order order, User user) throws Exception;
}
