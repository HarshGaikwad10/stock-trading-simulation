package com.stocktrading.stock_trading_backend.controller;

import com.stocktrading.stock_trading_backend.config.JwtProvider;
import com.stocktrading.stock_trading_backend.model.TwoFactorOTP;
import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.repository.UserRepository;
import com.stocktrading.stock_trading_backend.response.AuthResponse;
import com.stocktrading.stock_trading_backend.service.CustomUserDetailsService;
import com.stocktrading.stock_trading_backend.service.EmailService;
import com.stocktrading.stock_trading_backend.service.TwoFactorOtpService;
import com.stocktrading.stock_trading_backend.service.WatchListService;
import com.stocktrading.stock_trading_backend.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private TwoFactorOtpService twoFactorOtpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WatchListService watchListService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());

        if(isEmailExist!=null){
            throw new Exception("Email is already used by another account");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setFullName(user.getFullName());
        newUser.setDateOfBirth(user.getDateOfBirth());
        newUser.setNationality(user.getNationality());
        newUser.setAddress(user.getAddress());
        newUser.setCity(user.getCity());
        newUser.setPostcode(user.getPostcode());
        newUser.setCountry(user.getCountry());

        User savedUser = userRepository.save(newUser);

        watchListService.createWatchlist(savedUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(),user.getPassword()
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("register success");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {

        String userName = user.getEmail();

        String password = user.getPassword();

        Authentication auth = authenticate(userName,password);

        User authUser = userRepository.findByEmail(userName);

        if(authUser.getTwoFactorAuth().isEnabled()){
            String otp = OtpUtils.generateOtp();

            TwoFactorOTP oldTwoFactorOtp = twoFactorOtpService.findByUser(authUser.getId());
            if(oldTwoFactorOtp!=null){
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOtp);
            }

            TwoFactorOTP newTwoFactorOtp = twoFactorOtpService.createTwoFactorOtp(authUser,otp, JwtProvider.generateToken(auth));
            emailService.sendVerificationOtpEmail(userName,otp);

            AuthResponse res = new AuthResponse();
            res.setMessage("Two Factor Authentication is enabled");
            res.setTwoFactorAuthEnabled(true);
            res.setSession(newTwoFactorOtp.getId());
            return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
        }

        //Normal Login when 2FA is disabled
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = JwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("login success");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String userName, String password) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);

        if(userDetails==null){
            throw new BadCredentialsException("Invalid Username");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid Password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,password,userDetails.getAuthorities());
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySigningOtp(@PathVariable String otp, @RequestParam String id) throws Exception {
        TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);

        if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP,otp)){
            AuthResponse res = new AuthResponse();
            res.setMessage("Two factor authentication verified");
            res.setTwoFactorAuthEnabled(true);
            res.setJwt(twoFactorOTP.getJwt());
            return new ResponseEntity<>(res,HttpStatus.OK);
        }
        throw new Exception("Invalid Otp");
    }

}
