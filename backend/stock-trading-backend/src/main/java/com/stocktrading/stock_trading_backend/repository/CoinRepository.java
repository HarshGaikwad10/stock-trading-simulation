package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin,String> {

}
