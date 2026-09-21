# ?? PROJECT REPORT SYNOPSIS
## TripNexus: Distributed Multi-Modal Travel Booking & Disruption Operating System
**Academic Year:** 2025?2026 | **Degree:** B.Tech Computer Science & Engineering  
**Candidate Name:** Vivek Awasthi | **Subject:** Minor Project  

---

### 1. Project Title & Abstract
**Title:** TripNexus: Distributed Multi-Modal Travel Booking & Disruption Operating System  

**Abstract:**  
TripNexus is an enterprise-grade, distributed software system architected to overcome the structural deficiencies of current Global Distribution Systems (GDS) and Online Travel Agencies (OTAs) such as Expedia and MakeMyTrip. Built on a cloud-native microservices topology with event-driven architecture, TripNexus introduces five fundamental innovations: an autonomous AI-smart multi-day itinerary planner, collaborative group split-bill payment management with live ledger tracking, a geofenced 24/7 Emergency SOS assistant with radar hospital scanning, an eco-mobility carbon emissions comparator (yielding up to 88% CO? reduction through electric rail integration), and an Apache Kafka-driven real-time disruption engine providing 1-click automated wallet refunds. The system provides seamless role-based workflows for retail customers, B2B travel agents, and super administrators, adhering to strict Agile Scrum development methodologies.

---

### 2. Problem Statement & Research Motivation
Despite the maturity of commercial travel platforms, consumer and business travelers face severe friction:
1. **Isolated Search Silos:** Commercial OTAs optimize for single-mode transactions (flights or hotels), forcing travelers to manually assemble complex multi-day tours.
2. **The Group Payment Dilemma:** OTAs mandate a single payment card for group bookings. In case of cancelations or shared costs, travelers resort to external apps, creating reconciliation errors and financial disputes.
3. **Absence of Real-Time Traveler Duty-of-Care:** In cases of accidents or medical distress in unfamiliar geographic regions, existing OTAs offer no safety tools or emergency facility mapping.
4. **Carbon Opacity:** Travelers have zero transparent mechanism to assess the environmental impact of choosing aviation vs. high-speed rail or electric transit.
5. **Punitive Disruption & Refund Cycles:** Flight or train cancellations typically incur 7 to 14 business days of refund lag with opaque customer support handling.

TripNexus directly eliminates these pain points through reactive, event-driven computing and automated business logic.

---

### 3. System Objectives
1. **Develop a Microservices-Based Architecture:** Scaffolding modular services (`auth`, `catalog`, `booking`, `planner`, `group`, `safety`, `disruption`) registered via Netflix Eureka.
2. **Engineer an AI-Smart Itinerary Planner:** Dynamically generate day-by-day morning, afternoon, and evening travel schedules based on budget, traveler count, and travel vibe.
3. **Implement Real-Time Group Split-Billing:** Formulate an automated ledger distributing trip costs among travelers with individual payment confirmation tracking.
4. **Integrate Geofenced Emergency Assistance:** Provide 1-click SOS location broadcasting and nearby verified medical/police facility discovery.
5. **Establish an Eco-Mobility Engine:** Calculate and visually benchmark per-passenger carbon footprints across flights, trains, and electric buses.
6. **Provide Kafka-Driven Automated Disruption Protection:** Ingest carrier disruption events and provide instant 1-click 100% wallet reimbursement.

---

### 4. Technical Stack & Hardware Requirements
* **Frontend:** Responsive HTML5, Vanilla ES6 Modular JavaScript, Tailwind CSS (Dark Obsidian Glassmorphic Design), FontAwesome 6, Google Fonts.
* **Backend Microservices:** Java 17, Spring Boot 3.2.x, Spring Cloud Gateway, Netflix Eureka Server, Spring Data JPA.
* **Event Streaming & Message Broker:** Apache Kafka 7.5.0, Zookeeper.
* **Databases & In-Memory Stores:** PostgreSQL 16 (ACID Bookings & Auth), MongoDB 7.0 (AI Itineraries & Unstructured Catalog), Redis 7 (Distributed Cache & Rate Limiting).
* **Containerization & Tracing:** Docker, Docker Compose, OpenZipkin APM.
* **Methodology:** Agile Scrum (4 Sprints).

---

### 5. Functional Modules (Detailed Description)

#### Module 1: Unified Multi-Modal Catalog & Search Engine
Enables unified discovery across Flights (IndiGo, Vistara), Hotels & Resorts (Taj Exotica, W Goa, Zostel Eco-Homestay), High-Speed Trains (Vande Bharat Express, Rajdhani Express), and Electric Buses (Zingbus Volvo EV). Real-time inventory caching via Redis delivers sub-10ms response latencies.

#### Module 2: AI-Smart Itinerary Planner (Differentiator #1)
Takes destination, trip duration (1-14 days), budget limit, traveler count, and desired vibe (Beach & Culture, High Adrenaline, Ultra Luxury, Backpacking Green). Produces detailed day-by-day breakdowns detailing morning, afternoon, and evening itineraries strictly balanced within budget parameters.

#### Module 3: Group Trip & Split-Pay Ledger (Differentiator #2)
Permits travelers to create a collective expedition (e.g. "Goa Annual Reunion 2026"), generate unique join codes (`TRIP-702`), distribute the financial burden equally, track who has settled their share via interactive status badges (`PAID ?` vs `PENDING ?`), and dispatch automated SMS payment nudges.

#### Module 4: Emergency SOS Assistant & Radar (Differentiator #3)
Monitors traveler GPS coordinates (`15.2993? N, 74.1240? E`). Features a 5km radius radar scanner mapping verified 24/7 trauma hospitals, tourist police posts, and consular distress desks. Offers 1-click encrypted location sharing for instant dispatch to emergency contacts or national emergency line 112.

#### Module 5: Eco-Nexus Carbon Footprint Comparator (Differentiator #4)
Calculates real-time CO? emissions per traveler. Highlights high-efficiency alternatives such as electric high-speed rail, showing an **88% reduction** in greenhouse gas impact (14.5 kg CO? vs 122 kg CO? for commercial aviation).

#### Module 6: Kafka Disruption Broadcaster & Instant Refund (Differentiator #5)
Simulates carrier delays, gate changes, and cancellations via Kafka topic `travel.disruptions`. When triggered, passengers receive immediate warning alerts and can claim **1-click 100% instant refunds** credited directly back to their Nexus Wallet.

#### Module 7: B2B Travel Agent & Commission Broker Console
Permits registered travel agents to assemble bespoke vacation packages, define base net procurement costs, layer customized profit margins (markups), and publish directly into the public search catalog.

#### Module 8: Super Admin System Monitor
Provides health monitoring across all 9 microservices, Eureka registration statuses, Kafka broker health, and Redis cache hit ratios.

#### Module 9: Digital Boarding Pass & QR Ticket Engine
Generates IATA/Amadeus compliant digital boarding passes equipped with unique PNR identifiers, passenger metadata, seat allocations, and digital QR codes.

---

### 6. Agile Scrum Sprint Breakdown
* **Sprint 1 (Days 1?7):** Requirements gathering, system architecture blueprinting, database schema design, and microservices folder hierarchy creation.
* **Sprint 2 (Days 8?14):** Microservice registration in Eureka, API Gateway route filtering, multi-modal catalog schema, and basic booking transaction lifecycle.
* **Sprint 3 (Days 15?21):** Engineering the 5 core differentiators: AI Itinerary generator, Split-Pay ledger, Emergency SOS Radar, Eco-Comparator, and Kafka streaming broker.
* **Sprint 4 (Days 22?28):** Dark Obsidian glassmorphic UI polish, B2B Agent portal, Super Admin simulation, cross-browser validation, and technical documentation synthesis.

---

### 7. College Viva Q&A Preparation (External Examiner Defense)

**Q1: How is TripNexus different from Expedia or MakeMyTrip?**  
*Answer:* Expedia is a traditional transactional booking aggregator where the user does 100% of the manual planning, pays on a single credit card, receives no traveler safety tools, and waits up to 2 weeks for refunds. TripNexus is a modern *Travel Operating System* introducing: (1) Autonomous AI Day-by-Day Planning, (2) Real-Time Collaborative Group Split-Billing, (3) Geofenced 24/7 Emergency SOS Medical Radar, (4) Direct Carbon Footprint benchmarking (-88% CO? on trains), and (5) Instant Kafka-driven automated wallet refunds on flight/train delays.

**Q2: Why did you choose a Microservices architecture instead of a Monolith?**  
*Answer:* Travel systems experience asymmetric load. Search catalog queries happen 100x more frequently than actual payment checkouts. By decoupling `catalog-service` from `booking-service`, we can independently scale catalog instances and leverage Redis caching without provisioning expensive database write capacity on the booking database. Furthermore, failure in the `planner-service` does not compromise the core booking pipeline.

**Q3: What role does Apache Kafka play in your system?**  
*Answer:* Apache Kafka serves as the high-throughput, fault-tolerant distributed event streaming bus. In travel operations, carrier status changes (delays, gate changes, weather cancellations) occur asynchronously. When an airline or train emits a delay event to topic `travel.disruptions`, the `disruption-service` and consumer notification workers consume the event in real-time, alert affected passengers, and trigger automated instant wallet refunds without human intervention.

**Q4: Why did you use both PostgreSQL and MongoDB (Polyglot Persistence)?**  
*Answer:* Travel platforms handle two distinct categories of data:
1. **Transactional Data (Bookings, Wallet Balances, Payments):** Requires strict ACID compliance, foreign key constraints, and zero tolerance for balance anomalies. PostgreSQL is ideal for this.
2. **Dynamic Unstructured Data (AI Itineraries, Multi-Day Schedules, Custom Amenities):** Varies dramatically between a backpacking trip and a 5-star cruise. MongoDB's flexible JSON-like document model allows storing varied itinerary schema without expensive relational migrations.

**Q5: How does the Emergency SOS Assistant function without internet connectivity?**  
*Answer:* The emergency system stores verified offline geographic coordinates of district trauma hospitals, police posts, and consulates. When triggered, it utilizes native browser Geolocation API (`navigator.geolocation`) and encodes the GPS coordinates into an offline-compatible SOS SMS protocol that can be dispatched even on low-bandwidth cellular networks.
