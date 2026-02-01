package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.model.Coin;
import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.model.Watchlist;
import com.stocktrading.stock_trading_backend.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchListService{

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {
        Watchlist watchlist = watchlistRepository.findByUserId(userId);
        if(watchlist==null){
            throw new Exception("watchlist not found");
        }
        return watchlist;
    }

    @Override
    public Watchlist createWatchlist(User user) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);

        return watchlistRepository.save(watchlist);
    }

    @Override
    public Watchlist findById(Long id) throws Exception {
        Optional<Watchlist> watchlistOptional = watchlistRepository.findById(id);
        if(watchlistOptional.isEmpty()){
            throw new Exception("watchlist not found");
        }
        return watchlistOptional.get();
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        Watchlist watchlist = findUserWatchlist(user.getId());

        if(watchlist.getCoins().contains(coin)){
            watchlist.getCoins().remove(coin);
        }else {
            watchlist.getCoins().add(coin);
        }

        watchlistRepository.save(watchlist);

        return coin;
    }
}
