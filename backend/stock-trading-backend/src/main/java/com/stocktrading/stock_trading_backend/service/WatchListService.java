package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.model.Coin;
import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.model.Watchlist;

public interface WatchListService {

    Watchlist findUserWatchlist(Long userId) throws Exception;
    Watchlist createWatchlist(User user);
    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
