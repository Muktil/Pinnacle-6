"""
AquaGuard — Water Disease Early Warning System
Flask Backend with ML Prediction API
"""
from flask import Flask, render_template, jsonify, request
import pandas as pd
import numpy as np
import pickle
import json
import datetime
import os
import statistics
from functools import wraps
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
import jwt
import bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'aquaguard-super-secret-key-2026')
app.config['JWT_SECRET'] = os.environ.get('JWT_SECRET', 'aquaguard-jwt-secret-2026')

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'aquaguard.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- Initialization ---
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per minute"],
    storage_uri="memory://"
)

# --- Security Metrics ---
SECURITY_METRICS = {
    "total_requests": 0,
    "blocked_rate_limit": 0,
    "blocked_injection": 0,
    "blocked_auth": 0,
    "last_attack": None
}

# --- API Security Middleware ---
SQL_KEYWORDS = ['SELECT', 'DROP', 'INSERT', 'UPDATE', 'DELETE', '--']

@app.before_request
def security_scan():
    SECURITY_METRICS["total_requests"] += 1
    
    # Simple WAF for SQLi and XSS
    payloads = [request.args, request.form]
    if request.is_json:
        payloads.append(request.json)
        
    for p in payloads:
        if isinstance(p, dict):
            for k, v in p.items():
                if isinstance(v, str):
                    v_upper = v.upper()
                    # Check SQLi
                    if any(kw in v_upper for kw in SQL_KEYWORDS):
                        SECURITY_METRICS["blocked_injection"] += 1
                        SECURITY_METRICS["last_attack"] = {
                            "time": dt.now().strftime("%H:%M:%S"),
                            "ip": request.remote_addr,
                            "type": "SQL Injection",
                            "route": request.path
                        }
                        append_audit_log("Anonymous", "None", "ATTACK_ATTEMPT", f"SQLi payload in {request.path}", request.remote_addr)
                        return jsonify({"error": "Bad Request - Invalid Input"}), 400
                        
                    # Check XSS
                    if '<script>' in v.lower() or 'javascript:' in v.lower():
                        SECURITY_METRICS["blocked_injection"] += 1
                        SECURITY_METRICS["last_attack"] = {
                            "time": dt.now().strftime("%H:%M:%S"),
                            "ip": request.remote_addr,
                            "type": "XSS Attempt",
                            "route": request.path
                        }
                        append_audit_log("Anonymous", "None", "ATTACK_ATTEMPT", f"XSS payload in {request.path}", request.remote_addr)
                        return jsonify({"error": "Bad Request - Invalid Input"}), 400

@app.after_request
def apply_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

@app.errorhandler(429)
def ratelimit_handler(e):
    SECURITY_METRICS["blocked_rate_limit"] += 1
    append_audit_log("Anonymous", "None", "RATE_LIMIT_EXCEEDED", f"IP {request.remote_addr} exceeded limits", request.remote_addr)
    return jsonify({"error": "Rate limit exceeded"}), 429


# --- Immutable Audit Trail Setup ---
import hashlib
from datetime import datetime as dt
AUDIT_LOG = []

def append_audit_log(username, role, action, details, ip_address):
    timestamp = dt.now().strftime('%Y-%m-%d %H:%M:%S')
    prev_hash = AUDIT_LOG[-1]['hash'] if len(AUDIT_LOG) > 0 else '0'*64
    
    # Format: prev_hash + timestamp + username + action
    raw_str = f"{prev_hash}{timestamp}{username}{action}"
    new_hash = hashlib.sha256(raw_str.encode('utf-8')).hexdigest()
    
    entry = {
        "id": len(AUDIT_LOG) + 1,
        "timestamp": timestamp,
        "username": username,
        "role": role,
        "action": action,
        "details": details,
        "ip_address": ip_address,
        "hash": new_hash
    }
    AUDIT_LOG.append(entry)

@app.route('/api/audit-log', methods=['GET'])
@login_required
def get_audit_log():
    return jsonify(AUDIT_LOG[::-1]) # Return newest first

# --- Database Models ---
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.LargeBinary, nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def get_id(self):
        return self.username

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(username=user_id).first()

# Custom JWT decorator
def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('jwt_token')
        if not token:
            return jsonify({"error": "Unauthorized"}), 401
        try:
            data = jwt.decode(token, app.config['JWT_SECRET'], algorithms=["HS256"])
            # We can bind the role to request or just rely on current_user
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated_function

# --- Security Feature State ---
SENSOR_HISTORY = {}  # { "ZAN01": [{"val": 4.5, "ts": time, "type": "ph"}] }
ACTIVE_ANOMALIES = []

@app.route('/api/sensor-check', methods=['POST'])
@login_required
@limiter.limit("50 per minute")
def check_sensor_tamper():
    """Evaluate incoming sensor data against tamper rules."""
    data = request.json
    sensor_id = data.get('sensor_id')
    param = data.get('parameter')
    value = float(data.get('value', 0))
    timestamp = data.get('timestamp')
    
    if not sensor_id or not param:
        return jsonify({"error": "Missing sensor data"}), 400
        
    # Check 1: Future Timestamp
    try:
        ts = dt.fromisoformat(timestamp.replace('Z', '+00:00'))
        if ts > dt.utcnow():
            _trigger_tamper(sensor_id, "Future Timestamp Injection")
            return jsonify({"status": "TAMPERED", "reason": "Future timestamp"})
    except:
        pass # Ignore parse errors for mock
        
    # Check 2: Impossible Ranges
    if param == "ph" and (value < 2 or value > 12):
        _trigger_tamper(sensor_id, f"Impossible pH Value ({value})")
        return jsonify({"status": "TAMPERED", "reason": "Range violation"})
    if param == "temperature" and (value > 60 or value < -10):
        _trigger_tamper(sensor_id, f"Impossible Temp Value ({value}°C)")
        return jsonify({"status": "TAMPERED", "reason": "Range violation"})
    if param == "turbidity" and value > 1000:
        _trigger_tamper(sensor_id, f"Extreme Turbidity ({value} NTU)")
        return jsonify({"status": "TAMPERED", "reason": "Limit exceeded"})
        
    # Maintain rolling history (last 20 readings per sensor-parameter)
    key = f"{sensor_id}_{param}"
    if key not in SENSOR_HISTORY:
        SENSOR_HISTORY[key] = []
        
    history = SENSOR_HISTORY[key]
    
    # Check 3: Frozen Sensor (Same value 10+ times)
    if len(history) >= 10:
        last_10 = history[-10:]
        if all(abs(h['val'] - value) < 0.001 for h in last_10):
            _trigger_tamper(sensor_id, "Sensor Frozen / Spoofed Replay")
            return jsonify({"status": "TAMPERED", "reason": "Replay attack suspected"})
            
    # Check 4: Sudden Spike (>300% in <60s)
    if len(history) > 0:
        last_read = history[-1]
        time_diff = (dt.now() - last_read['ts']).total_seconds()
        if time_diff < 60 and last_read['val'] > 0:
            change_pct = abs(value - last_read['val']) / last_read['val']
            if change_pct > 3.0:  # > 300%
                _trigger_tamper(sensor_id, f"Sudden Spike Trigger ({change_pct*100:.0f}%)")
                return jsonify({"status": "TAMPERED", "reason": "Spike detected"})

    # Phase 4: Z-Score Anomaly Detection
    # Requires at least 5 readings to build a valid baseline mean/stdev
    if len(history) >= 5:
        vals = [h['val'] for h in history]
        mean_val = statistics.mean(vals)
        stdev_val = statistics.stdev(vals) if len(vals) > 1 else 0
        
        if stdev_val > 0:
            z_score = abs(value - mean_val) / stdev_val
            if z_score > 2.5:
                # Classify the anomaly
                confidence = min(99, int((z_score / 5.0) * 100))
                if z_score > 4.0:
                    a_type = "Cyber Manipulation Suspected"
                else:
                    a_type = "Natural Contamination Event"
                    
                anomaly = {
                    "id": len(ACTIVE_ANOMALIES) + 1,
                    "sensor_id": sensor_id,
                    "type": a_type,
                    "confidence": confidence,
                    "timestamp": dt.now().strftime("%H:%M:%S"),
                    "value": value,
                    "expected": f"~{mean_val:.1f} ± {stdev_val:.1f}"
                }
                ACTIVE_ANOMALIES.insert(0, anomaly)
                if len(ACTIVE_ANOMALIES) > 20:
                    ACTIVE_ANOMALIES.pop()
                
                append_audit_log("System", "AUTO", "SENSOR_ANOMALY_DETECTED", f"{sensor_id} - Z={z_score:.1f}", "127.0.0.1")
                
    # Add to history
    history.append({"val": value, "ts": dt.now()})
    if len(history) > 20:
        history.pop(0)
        
    return jsonify({"status": "SAFE"})

def _trigger_tamper(sensor_id, anomaly_type):
    # Log to audit trail
    append_audit_log("System", "AUTO", "TAMPER_ALERT_RAISED", f"{sensor_id} - {anomaly_type}", "127.0.0.1")

@app.route('/api/anomalies', methods=['GET'])
@login_required
def get_anomalies():
    return jsonify({
        "tamper_alerts": len([a for a in AUDIT_LOG if a['action'] == "TAMPER_ALERT_RAISED"]),
        "latest": [a for a in AUDIT_LOG if a['action'] == "TAMPER_ALERT_RAISED"][-1:],
        "active_anomalies": ACTIVE_ANOMALIES
    })

@app.route('/api/security-stats', methods=['GET'])
@login_required
def get_security_stats():
    # Calculate clean vs total for the UI
    total = max(SECURITY_METRICS["total_requests"], 1247) # Mock base traffic
    blocked_limit = SECURITY_METRICS["blocked_rate_limit"]
    blocked_inj = SECURITY_METRICS["blocked_injection"]
    blocked_auth = SECURITY_METRICS["blocked_auth"]
    clean = total - (blocked_limit + blocked_inj + blocked_auth)
    
    # Mock some base counters if zero to show UI functionality
    if total == 1247:
        blocked_limit += 12
        blocked_inj += 3
        blocked_auth += 47
        clean = 1185
        if not SECURITY_METRICS["last_attack"]:
            SECURITY_METRICS["last_attack"] = {"time": "14:31:02", "ip": "192.168.1.42", "type": "SQL Injection", "route": "/api/upload"}
            
    is_ddos = blocked_limit > 50
    rate = 100 if is_ddos else 52
            
    return jsonify({
        "metrics": {
            "total": total,
            "blocked_limit": blocked_limit,
            "blocked_injection": blocked_inj,
            "blocked_auth": blocked_auth,
            "clean": clean
        },
        "last_attack": SECURITY_METRICS["last_attack"],
        "ddos_active": is_ddos,
        "rate_per_min": rate
    })

# --- Load ML Model ---
MODEL = None
SCALER = None
try:
    with open('models/outbreak_model.pkl', 'rb') as f:
        MODEL = pickle.load(f)
    with open('models/scaler.pkl', 'rb') as f:
        SCALER = pickle.load(f)
    print("ML Model and Scaler loaded successfully.")
except Exception as e:
    print(f"Could not load model files: {e}")

# --- Load Dataset for Stats ---
SIH_DATA = None
WATER_DATA = None
try:
    SIH_DATA = pd.read_csv('data/sih_ner_health_data.csv')
    print(f"SIH data loaded: {SIH_DATA.shape}")
except:
    print("sih_ner_health_data.csv not found")

try:
    WATER_DATA = pd.read_csv('data/water_pollution_disease.csv')
    print(f"Water pollution data loaded: {WATER_DATA.shape}")
except:
    print("water_pollution_disease.csv not found")

# --- In-memory alarm store ---
ALARMS = [
    {"id": 1, "loc": "Guwahati Sector 2", "type": "High Turbidity", "severity": "warning",
     "status": "pending", "time": datetime.datetime.now().strftime("%H:%M"), "notes": "Turbidity reading above threshold"},
    {"id": 2, "loc": "Imphal East", "type": "E.Coli Detected", "severity": "danger",
     "status": "pending", "time": datetime.datetime.now().strftime("%H:%M"), "notes": "Bacterial contamination confirmed"},
]
ALARM_COUNTER = 3

# --- NER State Coordinates ---
NER_LOCATIONS = {
    "Assam": {"lat": 26.14, "lng": 91.73, "city": "Guwahati"},
    "Meghalaya": {"lat": 25.57, "lng": 91.88, "city": "Shillong"},
    "Mizoram": {"lat": 23.73, "lng": 92.72, "city": "Aizawl"},
    "Tripura": {"lat": 23.83, "lng": 91.28, "city": "Agartala"},
    "Arunachal Pradesh": {"lat": 27.10, "lng": 93.62, "city": "Itanagar"},
    "Nagaland": {"lat": 25.67, "lng": 94.12, "city": "Kohima"},
    "Manipur": {"lat": 24.81, "lng": 93.93, "city": "Imphal"},
    "Sikkim": {"lat": 27.33, "lng": 88.62, "city": "Gangtok"},
}


@app.route('/login', methods=['GET', 'POST'])
@limiter.limit("10 per minute")
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
            role = user.role
            login_user(user)
            
            # Generate JWT
            exp_time = dt.utcnow() + datetime.timedelta(hours=2)
            token = jwt.encode({
                'username': username,
                'role': role,
                'exp': exp_time,
                'iat': dt.utcnow()
            }, app.config['JWT_SECRET'], algorithm="HS256")
            
            append_audit_log(username, role, "USER_LOGIN", "Successful login", request.remote_addr)
            
            resp = jsonify({
                "success": True, 
                "redirect": "/dashboard", 
                "role": role,
                "username": username
            })
            resp.set_cookie('jwt_token', token, httponly=True, secure=False, samesite='Strict')
            return resp
        else:
            SECURITY_METRICS["blocked_auth"] += 1
            append_audit_log(username, "Unknown", "LOGIN_FAILED", "Invalid credentials", request.remote_addr)
            return jsonify({"success": False, "message": "Invalid credentials"}), 401
            
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    append_audit_log(current_user.id, current_user.role, "USER_LOGOUT", "Manual logout", request.remote_addr)
    logout_user()
    resp = app.make_response(app.redirect('/login'))
    resp.delete_cookie('jwt_token')
    return resp

@app.route('/dashboard')
@login_required
def dashboard():
    lang = request.args.get('lang', 'en')
    # Pass user role to template
    return render_template('index.html', lang=lang, user_role=current_user.role, username=current_user.id)

@app.route('/')
def public_view():
    return render_template('public.html')
# --- Operation Tickets Data ---
OPERATION_TICKETS = [
    {"id": 1, "title": "Inspect Turbidity Sensor ZAN01", "status": "Open", "assignee": "Rajesh Kumar", "created": dt.now().strftime('%Y-%m-%d %H:%M:%S')},
    {"id": 2, "title": "Check pH level anomaly in Sector 5", "status": "In Progress", "assignee": "Priya Sharma", "created": dt.now().strftime('%Y-%m-%d %H:%M:%S')}
]
TICKET_COUNTER = 3

@app.route('/api/tickets', methods=['GET', 'POST'])
@login_required
def manage_tickets():
    global TICKET_COUNTER
    if request.method == 'GET':
        return jsonify(OPERATION_TICKETS)
    elif request.method == 'POST':
        data = request.json
        new_ticket = {
            "id": TICKET_COUNTER,
            "title": data.get('title', 'New Ticket'),
            "status": "Open",
            "assignee": data.get('assignee', 'Unassigned'),
            "created": dt.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        OPERATION_TICKETS.insert(0, new_ticket)
        TICKET_COUNTER += 1
        append_audit_log(current_user.id, current_user.role, "TICKET_CREATED", f"Created ticket {new_ticket['id']}", request.remote_addr)
        return jsonify(new_ticket), 201

@app.route('/api/tickets/<int:ticket_id>', methods=['PUT', 'DELETE'])
@login_required
def update_ticket(ticket_id):
    for i, t in enumerate(OPERATION_TICKETS):
        if t['id'] == ticket_id:
            if request.method == 'PUT':
                data = request.json
                old_status = t['status']
                t['status'] = data.get('status', t['status'])
                t['assignee'] = data.get('assignee', t['assignee'])
                append_audit_log(current_user.id, current_user.role, "TICKET_UPDATED", f"Ticket {ticket_id} status {old_status}->{t['status']}", request.remote_addr)
                return jsonify(t)
            elif request.method == 'DELETE':
                del OPERATION_TICKETS[i]
                append_audit_log(current_user.id, current_user.role, "TICKET_DELETED", f"Deleted ticket {ticket_id}", request.remote_addr)
                return '', 204
    return jsonify({"error": "Ticket not found"}), 404



@app.route('/api/stats')
def get_stats():
    """Return aggregated statistics from datasets."""
    stats = {
        "active_sources": 988,
        "tests_conducted": 4254,
        "supplies_deployed": 40,
        "facilities_monitored": 2882,
        "warnings": 0,
        "dangers": 0,
        "monitoring": 0,
        "contamination_events": 0,
        "risk_areas": 0,
        "risk_points": 0,
        "resolved": 0,
    }

    if SIH_DATA is not None:
        outbreak_counts = SIH_DATA['Outbreak_Risk'].value_counts()
        total = len(SIH_DATA)
        dangers = int(outbreak_counts.get(1, 0))
        safe = int(outbreak_counts.get(0, 0))

        # Derive stats from data
        stats["dangers"] = min(dangers, 120)  # Scale for UI
        stats["warnings"] = int(dangers * 0.5)
        stats["monitoring"] = int(total * 0.02)
        stats["contamination_events"] = int(dangers * 0.15)
        stats["risk_areas"] = len(SIH_DATA['State'].unique()) * 13
        stats["risk_points"] = int(dangers * 0.08)
        stats["resolved"] = int(dangers * 0.06)

        # State-wise breakdown for map
        state_stats = {}
        for state in SIH_DATA['State'].unique():
            state_df = SIH_DATA[SIH_DATA['State'] == state]
            outbreak_pct = state_df['Outbreak_Risk'].mean() * 100
            avg_turbidity = state_df['Turbidity_NTU'].mean()
            avg_ph = state_df['pH_Level'].mean()
            avg_bacteria = state_df['Bacteria_Count_CFU'].mean()
            avg_temp = state_df['Temp_C'].mean()

            if state in NER_LOCATIONS:
                risk_level = "danger" if outbreak_pct > 50 else "warning" if outbreak_pct > 30 else "safe"
                state_stats[state] = {
                    "lat": NER_LOCATIONS[state]["lat"],
                    "lng": NER_LOCATIONS[state]["lng"],
                    "city": NER_LOCATIONS[state]["city"],
                    "outbreak_pct": round(outbreak_pct, 1),
                    "risk_level": risk_level,
                    "avg_turbidity": round(avg_turbidity, 2),
                    "avg_ph": round(avg_ph, 2),
                    "avg_bacteria": round(avg_bacteria, 1),
                    "avg_temp": round(avg_temp, 1),
                    "samples": len(state_df)
                }
        stats["state_data"] = state_stats

    # Weekly risk resolved data for chart
    # Logic: each day has NEW dangers detected.
    # Resolved = how many of (new + carried-over backlog) were fixed that day.
    # Delayed = dangers that remain unfixed (new + backlog - resolved).
    # Mon: 12 new + 3 backlog from last week = 15 total → resolved 10, delayed 5
    # Tue: 8 new + 5 backlog = 13 total → resolved 9, delayed 4
    # Wed: 15 new + 4 backlog = 19 total → resolved 12, delayed 7
    # Thu: 6 new + 7 backlog = 13 total → resolved 11, delayed 2
    # Fri: 10 new + 2 backlog = 12 total → resolved 8, delayed 4
    # Sat: 4 new + 4 backlog = 8 total → resolved 5, delayed 3
    # Sun: 7 new + 3 backlog = 10 total → resolved 8, delayed 2
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    stats["weekly_risk"] = {
        "labels": days,
        "danger":   [12,  8, 15,  6, 10,  4,  7],
        "delayed":  [ 5,  4,  7,  2,  4,  3,  2],
        "resolved": [10,  9, 12, 11,  8,  5,  8],
    }

    # Operation tickets data
    # Each month shows tickets CREATED by category + how many are still PENDING.
    # Total created = Inspection + Maintenance + Emergency
    # Jan: 120+80+25 = 225 created, 45 still pending
    # Feb: 145+95+30 = 270 created, 60 still pending
    # Mar: 160+110+18 = 288 created, 38 still pending
    stats["operation_tickets"] = {
        "labels": ["January", "February", "March"],
        "inspection":  [120, 145, 160],
        "maintenance": [ 80,  95, 110],
        "emergency":   [ 25,  30,  18],
        "resolved":    [180, 210, 250],
    }

    # Disease Case Tracker
    stats["disease_tracker"] = [
        {"name": "Cholera",      "cases": 34, "change": 12,  "trend": "up"},
        {"name": "Typhoid",      "cases": 58, "change": -8,  "trend": "down"},
        {"name": "Hepatitis A",  "cases": 21, "change": 5,   "trend": "up"},
        {"name": "Dysentery",    "cases": 45, "change": -15, "trend": "down"},
    ]

    # Heatmap data — lat, lng, intensity (0-1)
    stats["heatmap_data"] = [
        [26.14, 91.73, 0.9], [26.20, 91.60, 0.7], [26.00, 91.80, 0.5],
        [25.57, 91.88, 0.4], [23.73, 92.72, 0.3], [23.83, 91.28, 0.6],
        [27.10, 93.62, 0.8], [25.67, 94.12, 0.5], [24.81, 93.93, 0.7],
        [27.33, 88.62, 0.2], [26.50, 92.30, 0.6], [25.90, 93.73, 0.5],
        [27.47, 94.91, 0.8], [26.66, 92.78, 0.4], [24.87, 92.35, 0.3],
        [26.48, 90.56, 0.2], [25.52, 90.22, 0.3], [27.49, 95.36, 0.7],
    ]

    # Previous week stats for % change
    stats["prev_week"] = {
        "warnings": int(stats["warnings"] * 0.85),
        "dangers": int(stats["dangers"] * 1.1),
        "monitoring": int(stats["monitoring"] * 0.92),
        "contamination_events": int(stats["contamination_events"] * 1.05),
        "risk_areas": int(stats["risk_areas"] * 0.98),
        "resolved": int(stats["resolved"] * 0.80),
    }

    # WQI 30-day timeline — 6 parameters normalized to 0-100 scale
    import random
    random.seed(42)
    wqi_days = [f"Day {i+1}" for i in range(30)]
    stats["wqi_timeline"] = {
        "labels": wqi_days,
        "ph":       [round(random.uniform(60, 90), 1) for _ in range(30)],
        "turbidity": [round(random.uniform(40, 85), 1) for _ in range(30)],
        "ecoli":    [round(random.uniform(30, 75), 1) for _ in range(30)],
        "chlorine": [round(random.uniform(55, 95), 1) for _ in range(30)],
        "do":       [round(random.uniform(50, 88), 1) for _ in range(30)],
        "temp":     [round(random.uniform(45, 80), 1) for _ in range(30)],
    }

    # Field Officer Activity Log
    stats["officers"] = [
        {"name": "Rajesh Kumar",   "zone": "Guwahati East",  "checkin": "08:30", "alarms": 3, "status": "active"},
        {"name": "Priya Sharma",   "zone": "Guwahati West",  "checkin": "09:15", "alarms": 5, "status": "on-scene"},
        {"name": "Anil Das",       "zone": "Silchar",        "checkin": "07:45", "alarms": 2, "status": "active"},
        {"name": "Meena Devi",     "zone": "Imphal",         "checkin": "10:00", "alarms": 4, "status": "on-scene"},
        {"name": "Bikash Roy",     "zone": "Shillong",       "checkin": "08:00", "alarms": 1, "status": "active"},
        {"name": "Suman Borah",    "zone": "Dibrugarh",      "checkin": "—",     "alarms": 0, "status": "off-duty"},
        {"name": "Kavita Singh",   "zone": "Kohima",         "checkin": "09:30", "alarms": 2, "status": "active"},
        {"name": "Deepak Nath",    "zone": "Agartala",       "checkin": "08:15", "alarms": 3, "status": "active"},
    ]

    # Risk resolved summary
    wr = stats["weekly_risk"]
    stats["risk_summary"] = {
        "resolved": sum(wr["resolved"]),
        "pending": sum(wr["delayed"]),
        "escalated": sum(1 for d in wr["danger"] if d > 10),
    }

    # Enhanced Dashboard Data
    stats["dashboard"] = {
        "total_cases_month": 158,
        "risk_score_index": 62,
        "tests_pending": 47,
        "advisories_active": 2,
        # 90-day disease trend (monthly buckets: 3 months)
        "trend_90d": {
            "labels": list(range(1, 91)),
            "cholera":    [round(random.uniform(0, 8), 1) for _ in range(90)],
            "typhoid":    [round(random.uniform(0, 12), 1) for _ in range(90)],
            "hepatitis":  [round(random.uniform(0, 5), 1) for _ in range(90)],
            "dysentery":  [round(random.uniform(0, 10), 1) for _ in range(90)],
        },
        # Top 8 districts by cases
        "district_cases": [
            {"name": "Kamrup Metro", "cases": 42, "severity": "danger"},
            {"name": "Cachar",       "cases": 35, "severity": "danger"},
            {"name": "Imphal West",  "cases": 28, "severity": "warning"},
            {"name": "East Khasi",   "cases": 22, "severity": "warning"},
            {"name": "Dibrugarh",    "cases": 18, "severity": "warning"},
            {"name": "Kohima",       "cases": 14, "severity": "safe"},
            {"name": "West Tripura", "cases": 11, "severity": "safe"},
            {"name": "East Sikkim",  "cases": 6,  "severity": "safe"},
        ],
        # Benchmarks
        "wqi_yours": 58, "wqi_state": 67, "wqi_national": 72,
        "tier": 2,
        "tier_label": "Elevated Monitoring Required",
        "reporting_compliance": 70,
        # Top 5 high-risk districts
        "high_risk": [
            {"name": "Kamrup Metro", "score": 82, "cases": 42, "trend": "up"},
            {"name": "Cachar",       "score": 75, "cases": 35, "trend": "up"},
            {"name": "Imphal West",  "score": 64, "cases": 28, "trend": "down"},
            {"name": "East Khasi",   "score": 58, "cases": 22, "trend": "up"},
            {"name": "Dibrugarh",    "score": 51, "cases": 18, "trend": "down"},
        ],
    }

    # Enhanced danger source with timestamps
    stats["danger_sources"] = [
        {"device": "ZAN01", "type": "Turbidity", "value": 4.6, "range": "0–4", "unit": "NTU", "status": "danger", "updated": "2 min ago", "lat": 26.14, "lng": 91.73},
        {"device": "ZAN02", "type": "pH Level",  "value": 6.8, "range": "6.5–8.5", "unit": "pH", "status": "safe", "updated": "5 min ago", "lat": 25.57, "lng": 91.88},
        {"device": "ZAN03", "type": "E.Coli",    "value": 120, "range": "0–100", "unit": "CFU", "status": "danger", "updated": "1 min ago", "lat": 27.10, "lng": 93.62},
        {"device": "ZAN04", "type": "Chlorine",  "value": 0.3, "range": "0.2–1.0", "unit": "mg/L", "status": "safe", "updated": "8 min ago", "lat": 24.81, "lng": 93.93},
        {"device": "ZAN05", "type": "DO",         "value": 3.2, "range": "5–9", "unit": "mg/L", "status": "danger", "updated": "3 min ago", "lat": 23.83, "lng": 91.28},
    ]

    # Predictive Risk Score
    stats["risk_prediction"] = {
        "score": 72,
        "trend": "up",
        "confidence": 85,
        "next_24h": "High risk of E.Coli spike in Kamrup Metro",
    }

    # Audit Trail
    stats["audit_trail"] = [
        {"user": "Admin", "role": "admin", "action": "Published boil water advisory", "time": "21:05", "date": "11 Mar"},
        {"user": "Rajesh Kumar", "role": "officer", "action": "Completed alarm #1024 — Turbidity resolved", "time": "20:45", "date": "11 Mar"},
        {"user": "System", "role": "system", "action": "Auto-escalated alarm #1019 to Level 2", "time": "20:30", "date": "11 Mar"},
        {"user": "Priya Sharma", "role": "officer", "action": "Submitted SOP report for E.Coli detection", "time": "19:50", "date": "11 Mar"},
        {"user": "Admin", "role": "admin", "action": "Uploaded water_quality_march.csv (1,247 rows)", "time": "18:30", "date": "11 Mar"},
        {"user": "System", "role": "system", "action": "Generated daily PDF report — 11 Mar 2026", "time": "18:00", "date": "11 Mar"},
        {"user": "Meena Devi", "role": "officer", "action": "Dispatched to Imphal East — E.Coli alert", "time": "17:15", "date": "11 Mar"},
        {"user": "Admin", "role": "admin", "action": "Added new sensor ZAN06 at Dimapur", "time": "16:00", "date": "11 Mar"},
        {"user": "System", "role": "system", "action": "Heatmap data refreshed from 18 sensors", "time": "15:00", "date": "11 Mar"},
        {"user": "Anil Das", "role": "officer", "action": "Checked in at Silchar zone — 3 samples collected", "time": "14:20", "date": "11 Mar"},
    ]

    return jsonify(stats)


@app.route('/api/predict', methods=['POST'])
def predict():
    """Run ML prediction with provided parameters."""
    if MODEL is None or SCALER is None:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.json
    try:
        features = np.array([[
            float(data['ph']),
            float(data['turbidity']),
            float(data['nitrate']),
            float(data['bacteria']),
            float(data['rainfall']),
            float(data['temp']),
        ]])
        features_scaled = SCALER.transform(features)
        prediction = MODEL.predict(features_scaled)[0]
        probability = MODEL.predict_proba(features_scaled)[0][1]

        return jsonify({
            "risk": int(prediction),
            "probability": round(float(probability) * 100, 1),
            "status": "HIGH RISK" if prediction == 1 else "STABLE",
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/alarms')
def get_alarms():
    """Return all alarms."""
    completed = sum(1 for a in ALARMS if a['status'] == 'done')
    total = len(ALARMS) if len(ALARMS) > 0 else 1
    return jsonify({
        "alarms": ALARMS,
        "completed_pct": round((completed / total) * 100),
        "uncompleted_pct": round(((total - completed) / total) * 100),
    })


@app.route('/api/alarms', methods=['POST'])
def add_alarm():
    """Add a manual alarm."""
    global ALARM_COUNTER
    data = request.json
    new_alarm = {
        "id": ALARM_COUNTER,
        "loc": data.get('location', 'Unknown'),
        "type": data.get('type', 'Manual Alert'),
        "severity": data.get('severity', 'warning'),
        "status": "pending",
        "time": datetime.datetime.now().strftime("%H:%M"),
        "notes": data.get('notes', ''),
    }
    ALARMS.insert(0, new_alarm)
    ALARM_COUNTER += 1
    return jsonify({"success": True, "alarm": new_alarm})


@app.route('/api/alarms/<int:alarm_id>/toggle', methods=['POST'])
def toggle_alarm(alarm_id):
    """Toggle alarm status between pending and done."""
    for alarm in ALARMS:
        if alarm['id'] == alarm_id:
            alarm['status'] = 'done' if alarm['status'] == 'pending' else 'pending'
            return jsonify({"success": True, "alarm": alarm})
    return jsonify({"error": "Alarm not found"}), 404


def init_db():
    with app.app_context():
        db.create_all()
        if not User.query.first():
            # Seed default users
            defaults = [
                ("admin", b"admin123", "Admin"),
                ("officer1", b"officer123", "District Officer"),
                ("inspector1", b"inspect123", "Field Inspector"),
                ("guest", b"guest", "Public View")
            ]
            for u, p, r in defaults:
                hashed = bcrypt.hashpw(p, bcrypt.gensalt())
                db.session.add(User(username=u, password_hash=hashed, role=r))
            db.session.commit()
            print("Database initialized with default users.")

# Initialize DB when the app module is loaded (works with gunicorn too)
init_db()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)