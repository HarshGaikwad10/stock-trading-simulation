package com.stocktrading.stock_trading_backend.repository;

import com.stocktrading.stock_trading_backend.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset,Long> {

    List<Asset> findByUserId(Long userId);

    Asset findByUserIdAndCoinId(Long userId,String coinId);

}
