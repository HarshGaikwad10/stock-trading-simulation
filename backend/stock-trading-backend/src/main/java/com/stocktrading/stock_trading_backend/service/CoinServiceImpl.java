package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.cache.ApiCache;
import com.stocktrading.stock_trading_backend.model.Coin;
import com.stocktrading.stock_trading_backend.repository.CoinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;

@Service
public class CoinServiceImpl implements CoinService{

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<Coin> getCoinList(int page) throws Exception {

        String cacheKey = "coins_page_" + page;
        String cached = ApiCache.get(cacheKey);

        if (cached != null) {
            return objectMapper.readValue(cached, new TypeReference<List<Coin>>() {});
        }

        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per-page=10&page="+page;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET,entity,String.class);
            ApiCache.put(cacheKey, response.getBody());
            List<Coin> coinsList = objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {});

            return coinsList;

        } catch (HttpClientErrorException.TooManyRequests e) {
            if (cached != null) {
                return objectMapper.readValue(cached, new TypeReference<List<Coin>>() {});
            }
            System.out.println("CoinGecko rate limit hit...");
            return List.of();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("CoinGecko error (coin list): " + e.getMessage());
            return List.of();
        }

    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception {

        String cacheKey = "chart_" + coinId + "_" + days;

        // 1️⃣ Return cached response if available
        String cached = ApiCache.get(cacheKey);
        if (cached != null) {
            return cached;
        }

        String url = "https://api.coingecko.com/api/v3/coins/"+coinId+"/market_chart?vs_currency=usd&days="+days;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET,entity,String.class);

            ApiCache.put(cacheKey, response.getBody());

            return response.getBody();

        } catch (HttpClientErrorException.TooManyRequests e) {
            // If rate-limited, return cached data if present
            if (cached != null) return cached;
            throw new Exception("CoinGecko rate limit exceeded(MarketChart)");

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("CoinGecko error (market chart): " + e.getMessage());
            return "{\"prices\":[]}";
        }
    }

    @Override
    public String getCoinDetails(String coinId) throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/"+coinId;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET,entity,String.class);

            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Coin coin = new Coin();
            coin.setId(jsonNode.get("id").asString());
            coin.setName(jsonNode.get("name").asString());
            coin.setSymbol(jsonNode.get("symbol").asString());
            coin.setImage(jsonNode.get("image").get("large").asString());

            JsonNode marketData = jsonNode.get("market_data");

            coin.setCurrentPrice(marketData.get("current_price").get("usd").asDouble());
            coin.setMarketCap(marketData.get("market_cap").get("usd").asLong());
            coin.setMarketCapRank(marketData.get("market_cap_rank").asInt());
            coin.setTotalVolume(marketData.get("total_volume").get("usd").asLong());
            coin.setHigh24h(marketData.get("high_24h").get("usd").asDouble());
            coin.setLow24h(marketData.get("low_24h").get("usd").asDouble());
            coin.setPriceChange24h(marketData.get("price_change_24h").asDouble());
            coin.setPriceChangePercentage24h(marketData.get("price_change_percentage_24h").asDouble());

            coin.setMarketCapChange24h(marketData.get("market_cap_change_24h").asLong());
            coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h").asLong());

            coin.setTotalSupply(marketData.get("total_supply").asLong());

            coinRepository.save(coin);
            return response.getBody();

        }catch (HttpClientErrorException.TooManyRequests e) {
            System.out.println("CoinGecko rate limit hit (details)");
            return "{}";
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("CoinGecko error (details): " + e.getMessage());
            return "{}";
        }
    }

    @Override
    public Coin findById(String coinId) throws Exception {
        Optional<Coin> optionalCoin = coinRepository.findById(coinId);

        if(optionalCoin.isEmpty()){
            throw new Exception("coin not found");
        }

        return optionalCoin.get();
    }

    @Override
    public String searchCoin(String keyword) throws Exception {
        String url = "https://api.coingecko.com/api/v3/search?query="+keyword;

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET,entity,String.class);

            return response.getBody();

        } catch (HttpClientErrorException.TooManyRequests e) {
            System.out.println("CoinGecko rate limit hit (search)");
            return "{\"coins\":[]}";
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("CoinGecko error (search): " + e.getMessage());
            return "{\"coins\":[]}";
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRank() throws Exception {

        String cacheKey = "top50";
        String cached = ApiCache.get(cacheKey);

        if (cached != null) return cached;

        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET,entity,String.class);

            ApiCache.put(cacheKey, response.getBody());

            return response.getBody();

        } catch (HttpClientErrorException.TooManyRequests e) {
            System.out.println("CoinGecko rate limit hit (top50)");
            return "[]";
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("CoinGecko error (top50): " + e.getMessage());
            return "[]";
        }

    }

    @Override
    public String getTrendingCoins() throws Exception {

        String cacheKey = "trending";
        String cached = ApiCache.get(cacheKey);
        if (cached != null) return cached;

        String url = "https://api.coingecko.com/api/v3/search/trending";

        RestTemplate restTemplate = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET,entity,String.class);

            ApiCache.put(cacheKey, response.getBody());

            return response.getBody();

        } catch (HttpClientErrorException.TooManyRequests e) {
            System.out.println("CoinGecko rate limit hit (trending)");
            return "{}";
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("CoinGecko error (trending): " + e.getMessage());
            return "{}";
        }
    }
}
