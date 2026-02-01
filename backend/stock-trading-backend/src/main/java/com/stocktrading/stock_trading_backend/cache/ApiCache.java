package com.stocktrading.stock_trading_backend.cache;

import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;

public class ApiCache {

    private static class CacheItem {
        String data;
        long expiry;
    }

    private static final ConcurrentHashMap<String, CacheItem> CACHE = new ConcurrentHashMap<>();

    // Cache duration (seconds)
    private static final long TTL = 180; // or 180

    public static String get(String key) {
        CacheItem item = CACHE.get(key);
        if (item == null) return null;

        if (Instant.now().getEpochSecond() > item.expiry) {
            CACHE.remove(key);
            return null;
        }
        return item.data;
    }

    public static void put(String key, String data) {
        CacheItem item = new CacheItem();
        item.data = data;
        item.expiry = Instant.now().getEpochSecond() + TTL;
        CACHE.put(key, item);
    }
}
