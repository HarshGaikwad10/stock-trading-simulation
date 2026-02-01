package com.stocktrading.stock_trading_backend.model;

import com.stocktrading.stock_trading_backend.domain.PaymentMethod;
import com.stocktrading.stock_trading_backend.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    private PaymentOrderStatus status;

    private PaymentMethod paymentMethod;

    @ManyToOne
    private User user;

}
