package com.stocktrading.stock_trading_backend.service;

import com.razorpay.RazorpayException;
import com.stocktrading.stock_trading_backend.domain.PaymentMethod;
import com.stocktrading.stock_trading_backend.model.PaymentOrder;
import com.stocktrading.stock_trading_backend.model.User;
import com.stocktrading.stock_trading_backend.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean proceedPaymentOrder(PaymentOrder paymentOrder,String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount,Long orderId) throws RazorpayException;

    PaymentResponse createStripePaymentLink(User user, Long amount,Long orderId) throws StripeException;

}
