package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepository extends JpaRepository<Watchlist,Long> {
    Watchlist findByUserId(Long userId);
}
