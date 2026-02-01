package com.stocktrading.stock_trading_backend.request;

import com.stocktrading.stock_trading_backend.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {

private String coinId;
private double quantity;
private OrderType orderType;

}
