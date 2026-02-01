package com.stocktrading.stock_trading_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stocktrading.stock_trading_backend.domain.USER_ROLE;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data//for auto getters and setters using lombok
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; //primary key auto generated

    private String fullName;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password; //password should only be writeable not readable

    private LocalDate dateOfBirth;
    private String nationality;
    private String address;
    private String city;
    private String postcode;
    private String country;

    @Embedded
    private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();

    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;
}
