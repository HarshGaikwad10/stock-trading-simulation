package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.model.Withdrawal;

import java.util.List;

public interface WithdrawalService {
    Withdrawal requestWithdrawal(Long amount, User user);

    Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    List<Withdrawal> getUsersWithdrawalHistory(User user);

    List<Withdrawal> getAllWithdrawalRequest();
}
