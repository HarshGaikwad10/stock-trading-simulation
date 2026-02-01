package com.stocktrading.stock_trading_backend.controller;

import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.model.Wallet;
import com.stocktrading.stock_trading_backend.model.WalletTransaction;
import com.stocktrading.stock_trading_backend.service.TransactionService;
import com.stocktrading.stock_trading_backend.service.UserService;
import com.stocktrading.stock_trading_backend.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @GetMapping("/api/transactions")
    public ResponseEntity<List<WalletTransaction>> getUserWallet(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);

        List<WalletTransaction> transactions =
                transactionService.getWalletTransactions(wallet);

        return new ResponseEntity<>(transactions, HttpStatus.ACCEPTED);
    }
}
