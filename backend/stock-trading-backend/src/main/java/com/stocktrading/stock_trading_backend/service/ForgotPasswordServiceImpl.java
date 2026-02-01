package com.stocktrading.stock_trading_backend.service;

import com.stocktrading.stock_trading_backend.domain.VerificationType;
import com.stocktrading.stock_trading_backend.model.ForgotPasswordToken;
import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.repository.ForgotPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService{

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

//    @Override
//    public ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo) {
//
//        ForgotPasswordToken token = new ForgotPasswordToken();
//        token.setUser(user);
//        token.setSendTo(sendTo);
//        token.setVerificationType(verificationType);
//        token.setOtp(otp);
//        token.setId(id);
//
//        return forgotPasswordRepository.save(token);
//    }
public ForgotPasswordToken createToken(
        User user,
        String otp,
        VerificationType verificationType,
        String sendTo
) {
    ForgotPasswordToken token = new ForgotPasswordToken();
    token.setUser(user);
    token.setOtp(otp);
    token.setVerificationType(verificationType);
    token.setSendTo(sendTo);
    return forgotPasswordRepository.save(token);
}

    @Override
    public ForgotPasswordToken findById(String id) {
        Optional<ForgotPasswordToken> token = forgotPasswordRepository.findById(id);
        return token.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUser(Long userId) {
        return forgotPasswordRepository.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepository.delete(token);
    }
}
