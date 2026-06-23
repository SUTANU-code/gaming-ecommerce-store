package com.gamingstore.gaming.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/api/payment")

public class PaymentController {

    @Value("${razorpay.key.id}")
    private String razorpayKey;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestBody Map<String, Object> data
    ) {

        try {

            int amount =
                    Integer.parseInt(data.get("amount").toString());

            RazorpayClient client =
                    new RazorpayClient(
                            razorpayKey,
                            razorpaySecret
                    );

            JSONObject orderRequest = new JSONObject();

            orderRequest.put("amount", amount * 100);

            orderRequest.put("currency", "INR");

            orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

            Order order =
                    client.orders.create(orderRequest);

            Map<String, Object> response =
                    new HashMap<>();

            response.put("id", order.get("id"));

            response.put("amount", order.get("amount"));

            response.put("currency", order.get("currency"));

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
} 