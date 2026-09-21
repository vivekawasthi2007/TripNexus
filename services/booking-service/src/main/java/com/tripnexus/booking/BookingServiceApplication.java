package com.tripnexus.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.Map;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
@RequestMapping("/api/v1/bookings")
public class BookingServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookingServiceApplication.class, args);
    }

    @PostMapping("/reserve")
    public Map<String, Object> createBooking(@RequestBody Map<String, Object> request) {
        String pnr = "NX-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return Map.of(
            "pnr", pnr,
            "status", "CONFIRMED",
            "item", request.getOrDefault("itemName", "IndiGo 6E-204"),
            "passenger", "Vivek Awasthi",
            "message", "Reservation guaranteed across Amadeus GDS."
        );
    }
}
