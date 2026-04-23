# AquaGuard: Secure Real-Time Health Monitoring and Early Warning System
Critical Infrastructure Protection for Water-Borne Disease Prevention

---

## Overview
AquaGuard is a high-integrity, cyber-physical monitoring platform designed to safeguard municipal water infrastructure. In an era where water systems are increasingly targeted by cyber actors and biological threats, AquaGuard treats data integrity as a core public health requirement.

### The Problem
Traditional water monitoring is often siloed and static. If a malicious actor manipulates sensor data to hide a cholera outbreak or a chemical spill, the resulting delay in public warnings can be catastrophic.

### The Solution
AquaGuard integrates real-time biological monitoring with a Zero-Trust cybersecurity layer. It detects anomalies in water chemistry while simultaneously verifying the cryptographic integrity of the sensor data itself.

---

## Technical Stack
*   **Core Engine:** Python (Flask) for high-concurrency API orchestration.
*   **Frontend UI:** Vanilla JavaScript (ES6+), CSS3 with Glassmorphism for a modern interface.
*   **Security Logic:**
    *   Bcrypt for sensitive password salting and hashing.
    *   PyJWT for stateless, signed Role-Based Access Control (RBAC).
    *   Flask-Limiter for automated WAF (Web Application Firewall) rate-limiting.
*   **Data Visualization:**
    *   Leaflet.js: Multi-layered mapping (Sensors, River Contamination, Field Officers).
    *   Chart.js v4: Real-time analytics, Risk Gauges, and Security Timelines.
    *   jsPDF: Automated generation of encrypted incident reports.

---

## System Modules and Features

### 1. Cybersecurity Suite
*   **Immutable Audit Trail:** All system actions are chained using SHA-256 hashes. Any attempt to delete logs breaks the chain, providing a tamper-evident record.
*   **End-to-End Encryption (E2EE):** Simulated visualization of the AES-256 pipeline from IoT Node to Cloud Server.
*   **Smart WAF:** Actively blocks SQL Injection (SQLi), Cross-Site Scripting (XSS), and DDoS bursts.

### 2. Public Health Analytics
*   **AI Risk Prediction:** A weighted diagnostic engine that calculates outbreak likelihood based on pH, Turbidity, DO, and Bacterial counts.
*   **Dynamic SOPs:** Standard Operating Procedures generated based on alert types (e.g., E.Coli checklist vs. Cyber Incident protocol).
*   **Public Advisory Banner:** Instant alerts (Boil Water Advisories) that can be pushed to consumers.

### 3. Geospatial Intelligence
*   **River Pollution Animation:** Animates the physical flow of contamination through river networks when a sensor fails.
*   **Dispatch Integration:** SMS/WhatsApp dispatching for Field Officers with localized GPS coordinates.

### 4. Accessibility
*   **High Contrast Mode:** Optimized for low-visibility environments.
*   **Scalable Typography:** Dynamic font-size controls for accessibility compliance.

---

## Quick Start Guide

### 1. Installation
```bash
pip install flask flask-login flask-limiter pyjwt bcrypt pandas numpy
```

### 2. Launch
```bash
python app.py
```
Access via: `http://127.0.0.1:5000`

---

## Role-Based Access (Demo Accounts)
| Role | Identity | Password | Permissions |
| :--- | :--- | :--- | :--- |
| Admin | admin | admin123 | Full System Control and Security Config |
| District Officer | officer1 | officer123 | Alarm Management and Reporting |
| Field Inspector | inspector1 | inspect123 | SOP Checklist Access and Status Updates |
| Viewer | guest | guest | Read-only Public Dashboard |

---

## Presentation Script

### Phase A: Bio-Threat Response
1. Open Hamburger Menu -> Start Live Simulation.
2. Observe the River Animation pulsing as contamination spreads.
3. Open a "Pending" alarm and execute the SOP Checklist.

### Phase B: Cyber-Physical Defense
1. Click Simulate DDoS Attack in the Security Panel with Antivirus ON.
2. Observe the WAF rate-limiting traffic while the UI remains smooth.
3. Turn OFF Antivirus in the Hamburger menu and re-trigger DDoS.
4. Witness the System Failure state (glitches, telemetry loss, red overlays).

### Phase C: Reporting
1. Click "Generate PDF Report".
2. Present the automated summary as a deliverable for authorities.

---

## Compliance
Developed for the Water Disease Monitoring and Early Warning System Prototype, adhering to NCIIPC Critical Infrastructure Security standards.