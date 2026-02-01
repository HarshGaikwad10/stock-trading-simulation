package com.stocktrading.stock_trading_backend.model;

import com.stocktrading.stock_trading_backend.domain.WalletTransactionType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class WalletTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Wallet wallet;

    private WalletTransactionType type;

    private LocalDate date;

    private String transferId; //only for wallet-to-wallet tansfer otherwise null for add,buy,sell asset

    private String purpose;

    private Long amount;

}
