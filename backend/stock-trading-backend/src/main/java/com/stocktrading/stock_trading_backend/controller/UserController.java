package com.stocktrading.stock_trading_backend.controller;

import com.stocktrading.stock_trading_backend.request.ForgotPasswordTokenRequest;
import com.stocktrading.stock_trading_backend.domain.VerificationType;
import com.stocktrading.stock_trading_backend.model.ForgotPasswordToken;
import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.model.VerificationCode;
import com.stocktrading.stock_trading_backend.request.ResetPasswordRequest;
import com.stocktrading.stock_trading_backend.response.ApiResponse;
import com.stocktrading.stock_trading_backend.response.AuthResponse;
import com.stocktrading.stock_trading_backend.service.EmailService;
import com.stocktrading.stock_trading_backend.service.ForgotPasswordService;
import com.stocktrading.stock_trading_backend.service.UserService;
import com.stocktrading.stock_trading_backend.service.VerificationCodeService;
import com.stocktrading.stock_trading_backend.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VerificationType verificationType) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        if(verificationCode==null){
            verificationCode=verificationCodeService.sendVerificationCode(user,verificationType);
        }

        if(verificationType.equals(verificationType.EMAIL)){
            emailService.sendVerificationOtpEmail(user.getEmail(),verificationCode.getOtp());
        }

        return new ResponseEntity<>("verification otp sent successfully", HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @PathVariable String otp,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
                verificationCode.getEmail():verificationCode.getMobile();

        boolean isVerified = verificationCode.getOtp().equals(otp);

        if(isVerified){
            User updatedUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(),sendTo,user);
            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        throw new Exception("Wrong Otp");
    }

    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(
            @RequestBody ForgotPasswordTokenRequest request) throws Exception {

        User user = userService.findUserByEmail(request.getSendTo());
        String otp = OtpUtils.generateOtp();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

//        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());
//
//        if(token==null){
//            token = forgotPasswordService.createToken(user,id,otp,request.getVerificationType()     , request.getSendTo());
//        }
        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());

        if (token != null) {
            forgotPasswordService.deleteToken(token);
        }

        token = forgotPasswordService.createToken(
                user,
                otp,
                request.getVerificationType(),
                request.getSendTo()
        );

        if(request.getVerificationType().equals(VerificationType.EMAIL)){
            emailService.sendVerificationOtpEmail(
                    user.getEmail(),
                    token.getOtp()
            );
        }

        AuthResponse response = new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password Reset Otp Sent Successully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest request) throws Exception {


        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);
        boolean isVerified = forgotPasswordToken.getOtp().equals(request.getOtp());
        if(isVerified){
            userService.updatePassword(forgotPasswordToken.getUser(),request.getPassword());
            ApiResponse response = new ApiResponse();
            response.setMessage("password updated successfully");
            return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
        }
        throw new Exception("wrong otp");
    }

}
