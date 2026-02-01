package com.stocktrading.stock_trading_backend.request;

import com.stocktrading.stock_trading_backend.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {
    private String sendTo;
    private VerificationType verificationType;
}
