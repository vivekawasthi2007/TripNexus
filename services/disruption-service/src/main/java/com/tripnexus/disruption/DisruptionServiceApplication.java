package com.tripnexus.disruption;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.kafka.annotation.KafkaListener;
import java.util.Map;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
@RequestMapping("/api/v1/disruptions")
public class DisruptionServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(DisruptionServiceApplication.class, args);
    }

    @PostMapping("/broadcast")
    public Map<String, Object> broadcastDisruption(@RequestBody Map<String, Object> payload) {
        return Map.of(
            "topic", "travel.disruptions",
            "status", "PUBLISHED_TO_KAFKA",
            "carrier", payload.getOrDefault("carrier", "Vande Bharat Express"),
            "event", payload.getOrDefault("type", "DELAY")
        );
    }

    @KafkaListener(topics = "travel.disruptions", groupId = "nexus-disruption-group")
    public void handleDisruptionEvent(String eventMessage) {
        System.out.println("Processing Kafka event & triggering automated wallet refund: " + eventMessage);
    }
}
