package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.model.PaymentDetails;
import com.stocktrading.stock_trading_backend.model.User;

public interface PaymentDetailsService {

    public PaymentDetails addPaymentDetails(
            String accountNumber,
            String accountHolderName,
            String ifsc,
            String bankName,
            User user);

    public PaymentDetails getUsersPaymentDetails(User user);

}
