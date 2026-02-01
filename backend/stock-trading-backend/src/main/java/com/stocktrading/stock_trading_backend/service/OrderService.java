package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.domain.OrderType;
import com.stocktrading.stock_trading_backend.model.Coin;
import com.stocktrading.stock_trading_backend.model.Order;
import com.stocktrading.stock_trading_backend.model.OrderItem;
import com.stocktrading.stock_trading_backend.model.User;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType,String assetSymbol);

    Order processOrder(Coin coin,double quantity,OrderType orderType,User user) throws Exception;
}
