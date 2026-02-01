package com.stocktrading.stock_trading_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.Instant;
import java.util.Date;

@Entity
@Data
public class Coin {

    @Id
    @JsonProperty("id")
    private String id;   // bitcoin

    @JsonProperty("symbol")
    private String symbol;   // btc

    @JsonProperty("name")
    private String name;     // Bitcoin

    @JsonProperty("image")
    private String image;

    @JsonProperty("current_price")
    @Column(nullable = true)
    private Double currentPrice;

    @JsonProperty("market_cap")
    @Column(nullable = true)
    private Long marketCap;

    @JsonProperty("market_cap_rank")
    @Column(nullable = true)
    private Integer marketCapRank;

    @JsonProperty("fully_diluted_valuation")
    @Column(nullable = true)
    private Long fullyDilutedValuation;

    @JsonProperty("total_volume")
    @Column(nullable = true)
    private Long totalVolume;

    @JsonProperty("high_24h")
    @Column(nullable = true)
    private Double high24h;

    @JsonProperty("low_24h")
    @Column(nullable = true)
    private Double low24h;

    @JsonProperty("price_change_24h")
    @Column(nullable = true)
    private Double priceChange24h;

    @JsonProperty("price_change_percentage_24h")
    @Column(nullable = true)
    private Double priceChangePercentage24h;

    @JsonProperty("market_cap_change_24h")
    @Column(nullable = true)
    private Long marketCapChange24h;

    @JsonProperty("market_cap_change_percentage_24h")
    @Column(nullable = true)
    private Long marketCapChangePercentage24h;

    @JsonProperty("circulating_supply")
    @Column(nullable = true)
    private Long circulatingSupply;

    @JsonProperty("total_supply")
    @Column(nullable = true)
    private Long totalSupply;

    @JsonProperty("max_supply")
    @Column(nullable = true)
    private Long maxSupply;

    @JsonProperty("ath")
    @Column(nullable = true)
    private Double ath;

    @JsonProperty("ath_change_percentage")
    @Column(nullable = true)
    private Double athChangePercentage;

    @JsonProperty("ath_date")
    @Column(nullable = true)
    private Date athDate;

    @JsonProperty("atl")
    @Column(nullable = true)
    private Double atl;

    @JsonProperty("atl_change_percentage")
    @Column(nullable = true)
    private Double atlChangePercentage;

    @JsonProperty("atl_date")
    @Column(nullable = true)
    private Date atlDate;

    @JsonProperty("roi")
    @JsonIgnore
    @Column(nullable = true)
    private Double roi;   // nullable

    @JsonProperty("last_updated")
    private Date lastUpdated;
}
