package com.stocktrading.stock_trading_backend.model;

import com.stocktrading.stock_trading_backend.domain.VerificationType;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class TwoFactorAuth {
    private boolean isEnabled;
    private VerificationType sendTo;
}
