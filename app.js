/**
 * AquaGuard — Water Disease Early Warning System
 * Full JavaScript Application Logic
 */

// ==========================================
// Translation System
// ==========================================
const TRANSLATIONS = {
    en: {
        title: "AquaGuard",
        subtitle: "Water Disease Early Warning",
        nav: { safety: "Home", defend: "Alerts", danger: "Data", officer: "Reports", task: "Agency" },
        kpi: { sources: "Active Water Sources", tests: "Tests Conducted", supplies: "Supplies Deployed", facilities: "Facilities Monitored" },
        dataOverview: "Data Overview",
        warnings: "Warnings",
        dangers: "Danger",
        monitoring: "Monitoring",
        contamination: "Contamination",
        riskAreas: "Risk Areas",
        riskPoints: "Risk Pts",
        resolved: "Resolved",
        dualPrev: "Risk Resolved This Week",
        opTickets: "Operation Tickets",
        alarmStatus: "Alarm Status",
        completed: "Completed",
        uncompleted: "Uncompleted",
        recentAlarms: "Recent Alarms",
        addAlarm: "+ Add Manual Alarm",
        dangerSource: "Danger Source",
        activeAlarms: "Active Alarms",
        dashboard: "DASHBOARD",
        alarmModal: "Alarm Center",
        manualEntry: "Manual Alarm Entry",
        location: "Location",
        type: "Alert Type",
        severity: "Severity",
        notes: "Notes",
        submit: "Submit Alarm",
        dashTitle: "Risk Analytics Dashboard",
        totalCases: "Total Contamination Cases",
        riskIndex: "Risk Score Index",
        activePool: "Current Alert Pool",
        labTests: "Lab Tests Participated",
        tierLevel: "Monitoring Tier",
        predict: "AI Risk Prediction",
        runAnalysis: "🚀 Run AI Diagnostic",
        ph: "pH Level",
        turbidity: "Turbidity (NTU)",
        nitrate: "Nitrate (mg/L)",
        bacteria: "Bacteria (CFU)",
        rainfall: "Rainfall (mm)",
        temp: "Temperature (°C)",
        highRisk: "⚠️ HIGH RISK DETECTED",
        stable: "✅ SYSTEM STABLE",
        likelihood: "Outbreak Likelihood",
        layers: { danger: "Danger", point: "Point", risk: "Risk Map", officer: "Officer", supply: "Supply" },
        device: "Device", value: "Value", range: "Range",
    },
    hi: {
        title: "एक्वागार्ड",
        subtitle: "जल रोग पूर्व चेतावनी",
        nav: { safety: "होम", defend: "अलर्ट", danger: "डेटा", officer: "रिपोर्ट", task: "एजेंसी" },
        kpi: { sources: "सक्रिय जल स्रोत", tests: "परीक्षण किए गए", supplies: "आपूर्ति तैनात", facilities: "सुविधाएं निगरानी" },
        dataOverview: "डेटा अवलोकन",
        warnings: "चेतावनी",
        dangers: "खतरा",
        monitoring: "निगरानी",
        contamination: "संदूषण",
        riskAreas: "जोखिम क्षेत्र",
        riskPoints: "जोखिम बिंदु",
        resolved: "हल किया",
        dualPrev: "इस सप्ताह जोखिम का समाधान",
        opTickets: "ऑपरेशन टिकट",
        alarmStatus: "अलार्म स्थिति",
        completed: "पूर्ण",
        uncompleted: "अपूर्ण",
        recentAlarms: "हालिया अलार्म",
        addAlarm: "+ मैनुअल अलार्म",
        dangerSource: "खतरे का स्रोत",
        activeAlarms: "सक्रिय अलार्म",
        dashboard: "डैशबोर्ड",
        alarmModal: "अलार्म केंद्र",
        manualEntry: "मैनुअल अलार्म प्रविष्टि",
        location: "स्थान",
        type: "अलर्ट प्रकार",
        severity: "गंभीरता",
        notes: "नोट्स",
        submit: "अलार्म जमा करें",
        dashTitle: "जोखिम विश्लेषण डैशबोर्ड",
        totalCases: "कुल संदूषण मामले",
        riskIndex: "जोखिम स्कोर सूचकांक",
        activePool: "वर्तमान अलर्ट पूल",
        labTests: "प्रयोगशाला परीक्षण",
        tierLevel: "निगरानी स्तर",
        predict: "एआई जोखिम भविष्यवाणी",
        runAnalysis: "🚀 एआई निदान चलाएं",
        ph: "पीएच स्तर",
        turbidity: "मैलापन (NTU)",
        nitrate: "नाइट्रेट (mg/L)",
        bacteria: "बैक्टीरिया (CFU)",
        rainfall: "वर्षा (mm)",
        temp: "तापमान (°C)",
        highRisk: "⚠️ उच्च जोखिम",
        stable: "✅ सुरक्षित",
        likelihood: "प्रकोप संभावना",
        layers: { danger: "खतरा", point: "बिंदु", risk: "जोखिम मेप", officer: "अधिकारी", supply: "आपूर्ति" },
        device: "उपकरण", value: "मूल्य", range: "सीमा",
    },
    as: {
        title: "একোৱাগাৰ্ড",
        subtitle: "জল ৰোগ পূৰ্ব সতৰ্কতা",
        nav: { safety: "হোম", defend: "সতৰ্কতা", danger: "তথ্য", officer: "প্ৰতিবেদন", task: "এজেন্সি" },
        kpi: { sources: "সক্ৰিয় জল উৎস", tests: "পৰীক্ষা কৰা হৈছে", supplies: "যোগান তৈনাত", facilities: "সুবিধা নিৰীক্ষণ" },
        dataOverview: "তথ্য অৱলোকন",
        warnings: "সতৰ্কতা",
        dangers: "বিপদ",
        monitoring: "নিৰীক্ষণ",
        contamination: "দূষণ",
        riskAreas: "আশংকা এলেকা",
        riskPoints: "আশংকা বিন্দু",
        resolved: "সমাধান",
        dualPrev: "এই সপ্তাহত আশংকা দূৰ",
        opTickets: "অপাৰেচন টিকট",
        alarmStatus: "এলাৰ্ম স্থিতি",
        completed: "সম্পূৰ্ণ",
        uncompleted: "অসম্পূৰ্ণ",
        recentAlarms: "শেহতীয়া এলাৰ্ম",
        addAlarm: "+ মেনুৱেল এলাৰ্ম",
        dangerSource: "বিপদৰ উৎস",
        activeAlarms: "সক্ৰিয় এলাৰ্ম",
        dashboard: "ডেশ্ববোৰ্ড",
        alarmModal: "এলাৰ্ম কেন্দ্ৰ",
        manualEntry: "মেনুৱেল এলাৰ্ম প্ৰৱেশ",
        location: "স্থান",
        type: "এলাৰ্ট প্ৰকাৰ",
        severity: "গুৰুতৰতা",
        notes: "টোকা",
        submit: "এলাৰ্ম দাখিল",
        dashTitle: "আশংকা বিশ্লেষণ ডেশ্ববোৰ্ড",
        totalCases: "মুঠ দূষণ ঘটনা",
        riskIndex: "আশংকা স্কোৰ সূচক",
        activePool: "বৰ্তমান এলাৰ্ট পুল",
        labTests: "পৰীক্ষাগাৰ পৰীক্ষা",
        tierLevel: "নিৰীক্ষণ স্তৰ",
        predict: "এআই আশংকাৰ পূৰ্বানুমান",
        runAnalysis: "🚀 এআই নিদান চলাওক",
        ph: "পিএইচ স্তৰ",
        turbidity: "মলিনতা (NTU)",
        nitrate: "নাইট্ৰেট (mg/L)",
        bacteria: "বেক্টেৰিয়া (CFU)",
        rainfall: "বৰষুণ (mm)",
        temp: "তাপমাত্ৰা (°C)",
        highRisk: "⚠️ উচ্চ আশংকা",
        stable: "✅ সুৰক্ষিত",
        likelihood: "প্ৰকোপৰ সম্ভাৱনা",
        layers: { danger: "বিপদ", point: "বিন্দু", risk: "আশংকা মেপ", officer: "বিষয়া", supply: "যোগান" },
        device: "ডিভাইচ", value: "মূল্য", range: "পৰিসৰ",
    },
    fr: {
        title: "AquaGuard",
        subtitle: "Alerte Précoce Maladies Hydriques",
        nav: { safety: "Accueil", defend: "Alertes", danger: "Données", officer: "Rapports", task: "Agence" },
        kpi: { sources: "Sources d'eau actives", tests: "Tests effectués", supplies: "Fournitures déployées", facilities: "Installations surveillées" },
        dataOverview: "Aperçu des données",
        warnings: "Alertes",
        dangers: "Danger",
        monitoring: "Surveillance",
        contamination: "Contamination",
        riskAreas: "Zones à risque",
        riskPoints: "Points de risque",
        resolved: "Résolus",
        dualPrev: "Risque résolu cette semaine",
        opTickets: "Tickets d'opération",
        alarmStatus: "État des alarmes",
        completed: "Terminé",
        uncompleted: "En cours",
        recentAlarms: "Alarmes récentes",
        addAlarm: "+ Alarme manuelle",
        dangerSource: "Source de danger",
        activeAlarms: "Alarmes actives",
        dashboard: "TABLEAU DE BORD",
        alarmModal: "Centre d'alarme",
        manualEntry: "Saisie manuelle d'alarme",
        location: "Lieu",
        type: "Type d'alerte",
        severity: "Gravité",
        notes: "Notes",
        submit: "Soumettre l'alarme",
        dashTitle: "Tableau de bord des risques",
        totalCases: "Cas de contamination totaux",
        riskIndex: "Indice de risque",
        activePool: "Pool d'alertes actif",
        labTests: "Tests en laboratoire",
        tierLevel: "Niveau de surveillance",
        predict: "Prédiction IA des risques",
        runAnalysis: "🚀 Lancer le diagnostic IA",
        ph: "Niveau pH",
        turbidity: "Turbidité (NTU)",
        nitrate: "Nitrate (mg/L)",
        bacteria: "Bactéries (CFU)",
        rainfall: "Précipitations (mm)",
        temp: "Température (°C)",
        highRisk: "⚠️ RISQUE ÉLEVÉ",
        stable: "✅ SYSTÈME STABLE",
        likelihood: "Probabilité d'épidémie",
        layers: { danger: "Danger", point: "Point", risk: "Carte risque", officer: "Agent", supply: "Fournitures" },
        device: "Appareil", value: "Valeur", range: "Plage",
    },
    es: {
        title: "AquaGuard",
        subtitle: "Alerta Temprana Enfermedades Hídricas",
        nav: { safety: "Inicio", defend: "Alertas", danger: "Datos", officer: "Informes", task: "Agencia" },
        kpi: { sources: "Fuentes de agua activas", tests: "Pruebas realizadas", supplies: "Suministros desplegados", facilities: "Instalaciones monitoreadas" },
        dataOverview: "Resumen de datos",
        warnings: "Advertencias",
        dangers: "Peligro",
        monitoring: "Monitoreo",
        contamination: "Contaminación",
        riskAreas: "Zonas de riesgo",
        riskPoints: "Puntos de riesgo",
        resolved: "Resueltos",
        dualPrev: "Riesgo resuelto esta semana",
        opTickets: "Tickets de operación",
        alarmStatus: "Estado de alarmas",
        completed: "Completado",
        uncompleted: "Incompleto",
        recentAlarms: "Alarmas recientes",
        addAlarm: "+ Alarma manual",
        dangerSource: "Fuente de peligro",
        activeAlarms: "Alarmas activas",
        dashboard: "PANEL",
        alarmModal: "Centro de alarma",
        manualEntry: "Entrada manual de alarma",
        location: "Ubicación",
        type: "Tipo de alerta",
        severity: "Gravedad",
        notes: "Notas",
        submit: "Enviar alarma",
        dashTitle: "Panel de análisis de riesgos",
        totalCases: "Casos totales de contaminación",
        riskIndex: "Índice de riesgo",
        activePool: "Pool de alertas activo",
        labTests: "Pruebas de laboratorio",
        tierLevel: "Nivel de monitoreo",
        predict: "Predicción IA de riesgos",
        runAnalysis: "🚀 Ejecutar diagnóstico IA",
        ph: "Nivel pH",
        turbidity: "Turbidez (NTU)",
        nitrate: "Nitrato (mg/L)",
        bacteria: "Bacterias (CFU)",
        rainfall: "Precipitaciones (mm)",
        temp: "Temperatura (°C)",
        highRisk: "⚠️ RIESGO ALTO",
        stable: "✅ SISTEMA ESTABLE",
        likelihood: "Probabilidad de brote",
        layers: { danger: "Peligro", point: "Punto", risk: "Mapa riesgo", officer: "Oficial", supply: "Suministro" },
        device: "Dispositivo", value: "Valor", range: "Rango",
    },
    pt: {
        title: "AquaGuard",
        subtitle: "Alerta Precoce Doenças Hídricas",
        nav: { safety: "Início", defend: "Alertas", danger: "Dados", officer: "Relatórios", task: "Agência" },
        kpi: { sources: "Fontes de água ativas", tests: "Testes realizados", supplies: "Suprimentos implantados", facilities: "Instalações monitoradas" },
        dataOverview: "Visão geral dos dados",
        warnings: "Avisos", dangers: "Perigo", monitoring: "Monitoramento", contamination: "Contaminação",
        riskAreas: "Áreas de risco", riskPoints: "Pontos de risco", resolved: "Resolvidos",
        dualPrev: "Risco resolvido esta semana", opTickets: "Tickets de operação",
        alarmStatus: "Status de alarme", completed: "Concluído", uncompleted: "Pendente",
        recentAlarms: "Alarmes recentes", addAlarm: "+ Alarme manual", dangerSource: "Fonte de perigo",
        activeAlarms: "Alarmes ativos", dashboard: "PAINEL", alarmModal: "Centro de alarme",
        manualEntry: "Entrada manual de alarme", location: "Local", type: "Tipo de alerta",
        severity: "Gravidade", notes: "Notas", submit: "Enviar alarme",
        dashTitle: "Painel de análise de risco",
        totalCases: "Total de casos", riskIndex: "Índice de risco",
        activePool: "Pool de alertas", labTests: "Testes de lab",
        tierLevel: "Nível de monitoramento", predict: "Previsão IA de risco",
        runAnalysis: "🚀 Executar diagnóstico IA",
        ph: "Nível pH", turbidity: "Turbidez (NTU)", nitrate: "Nitrato (mg/L)",
        bacteria: "Bactérias (CFU)", rainfall: "Chuva (mm)", temp: "Temperatura (°C)",
        highRisk: "⚠️ ALTO RISCO", stable: "✅ SISTEMA ESTÁVEL", likelihood: "Probabilidade",
        layers: { danger: "Perigo", point: "Ponto", risk: "Mapa risco", officer: "Oficial", supply: "Suprimento" },
        device: "Dispositivo", value: "Valor", range: "Faixa",
    }
};

// ==========================================
// State
// ==========================================
let currentLang = new URLSearchParams(window.location.search).get('lang') || 'en';
let map = null;
let markers = [];
let activeLayers = { danger: true, point: true, risk: true, officer: true, supply: true };
let chartInstances = {};
let cachedStats = null;
let activeNavFilter = 'safety';
let heatmapLayer = null;
let mapLayersState = { markers: false, heatmap: false, rivers: true, districts: true, floods: false, hospitals: false };
let districtLayer = null;
let floodLayer = null;
let hospitalLayer = null;

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadStats();
    loadAlarms();
    applyTranslations();
    setupEventListeners();
});

// ==========================================
// Count-Up Animation
// ==========================================
function animateCountUp(element, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * eased);
        element.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ==========================================
// Toast Notification System
// ==========================================
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const colorMap = {
        success: '#12B76A', warning: '#E68A00', error: '#D92D20', info: '#0077CC'
    };
    const iconMap = {
        success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️'
    };

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.style.borderLeftColor = colorMap[type] || colorMap.info;
    toast.innerHTML = `<span class="toast-icon">${iconMap[type] || iconMap.info}</span><span class="toast-text">${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ==========================================
// Map Layer Toggle System
// ==========================================
function toggleMapLayer(layerName, btn) {
    mapLayersState[layerName] = !mapLayersState[layerName];
    const isActive = mapLayersState[layerName];

    if (btn) btn.classList.toggle('active', isActive);

    if (layerName === 'markers') {
        markers.forEach(m => {
            if (isActive) { if (!map.hasLayer(m)) map.addLayer(m); }
            else { map.removeLayer(m); }
        });
    }
    if (layerName === 'heatmap') {
        if (heatmapLayer) {
            if (isActive) { if (!map.hasLayer(heatmapLayer)) map.addLayer(heatmapLayer); }
            else { map.removeLayer(heatmapLayer); }
        }
    }
    if (layerName === 'rivers') {
        riverLayers.forEach(r => {
            if (isActive) { if (!map.hasLayer(r)) map.addLayer(r); }
            else { map.removeLayer(r); }
        });
    }
    if (layerName === 'districts') {
        if (!districtLayer) addDistrictChoropleth();
        if (districtLayer) {
            if (isActive) map.addLayer(districtLayer);
            else map.removeLayer(districtLayer);
        }
    }
    if (layerName === 'floods') {
        if (!floodLayer) addFloodOverlay();
        if (floodLayer) {
            if (isActive) map.addLayer(floodLayer);
            else map.removeLayer(floodLayer);
        }
    }
    if (layerName === 'hospitals') {
        if (!hospitalLayer) addHospitalLayer();
        if (hospitalLayer) {
            if (isActive) map.addLayer(hospitalLayer);
            else map.removeLayer(hospitalLayer);
        }
    }

    showToast(`${layerName.charAt(0).toUpperCase() + layerName.slice(1)} layer ${isActive ? 'enabled' : 'disabled'}`, 'info', 1500);
}

// ==========================================
// Add Heatmap Layer
// ==========================================
function addHeatmapLayer(heatData) {
    if (!heatData || !L.heatLayer) return;

    heatmapLayer = L.heatLayer(heatData, {
        radius: 35,
        blur: 25,
        maxZoom: 12,
        gradient: {
            0.0: '#22c55e',
            0.3: '#84cc16',
            0.5: '#eab308',
            0.7: '#f97316',
            1.0: '#ef4444',
        }
    });
}

// ==========================================
// District Boundary Choropleth
// ==========================================
function addDistrictChoropleth() {
    // Simplified polygons for NER states
    const districtGeo = {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', properties: { name: 'Kamrup Metro', cases: 42, risk: 82, severity: 'danger' },
              geometry: { type: 'Polygon', coordinates: [[[91.5,26.0],[91.9,26.0],[91.9,26.25],[91.5,26.25],[91.5,26.0]]] }},
            { type: 'Feature', properties: { name: 'Cachar', cases: 35, risk: 75, severity: 'danger' },
              geometry: { type: 'Polygon', coordinates: [[[92.4,24.6],[93.0,24.6],[93.0,25.0],[92.4,25.0],[92.4,24.6]]] }},
            { type: 'Feature', properties: { name: 'Imphal West', cases: 28, risk: 64, severity: 'warning' },
              geometry: { type: 'Polygon', coordinates: [[[93.7,24.6],[94.1,24.6],[94.1,25.0],[93.7,25.0],[93.7,24.6]]] }},
            { type: 'Feature', properties: { name: 'East Khasi Hills', cases: 22, risk: 58, severity: 'warning' },
              geometry: { type: 'Polygon', coordinates: [[[91.6,25.3],[92.1,25.3],[92.1,25.7],[91.6,25.7],[91.6,25.3]]] }},
            { type: 'Feature', properties: { name: 'Dibrugarh', cases: 18, risk: 51, severity: 'warning' },
              geometry: { type: 'Polygon', coordinates: [[[94.5,27.2],[95.2,27.2],[95.2,27.6],[94.5,27.6],[94.5,27.2]]] }},
            { type: 'Feature', properties: { name: 'Kohima', cases: 14, risk: 42, severity: 'safe' },
              geometry: { type: 'Polygon', coordinates: [[[93.8,25.5],[94.3,25.5],[94.3,25.9],[93.8,25.9],[93.8,25.5]]] }},
            { type: 'Feature', properties: { name: 'West Tripura', cases: 11, risk: 35, severity: 'safe' },
              geometry: { type: 'Polygon', coordinates: [[[91.0,23.5],[91.6,23.5],[91.6,24.0],[91.0,24.0],[91.0,23.5]]] }},
            { type: 'Feature', properties: { name: 'East Sikkim', cases: 6, risk: 22, severity: 'safe' },
              geometry: { type: 'Polygon', coordinates: [[[88.4,27.1],[88.8,27.1],[88.8,27.5],[88.4,27.5],[88.4,27.1]]] }},
        ]
    };

    const colorMap = { danger: '#D92D2080', warning: '#E68A0060', safe: '#12B76A40' };
    const borderMap = { danger: '#D92D20', warning: '#E68A00', safe: '#12B76A' };

    districtLayer = L.geoJSON(districtGeo, {
        style: (feature) => ({
            fillColor: colorMap[feature.properties.severity] || '#12B76A40',
            color: borderMap[feature.properties.severity] || '#12B76A',
            weight: 2,
            fillOpacity: 0.5,
            opacity: 0.8,
        }),
        onEachFeature: (feature, layer) => {
            const p = feature.properties;
            layer.bindPopup(`
                <div style="font-family:Oxanium,sans-serif;min-width:140px;">
                    <strong>${p.name}</strong><br>
                    <span style="font-family:JetBrains Mono,monospace;font-size:12px;">
                        Cases: <b>${p.cases}</b><br>
                        Risk Score: <b style="color:${borderMap[p.severity]}">${p.risk}/100</b>
                    </span>
                </div>
            `);
            layer.on('mouseover', function() { this.setStyle({ weight: 3, fillOpacity: 0.7 }); });
            layer.on('mouseout', function() { districtLayer.resetStyle(this); });
        }
    });
}

// ==========================================
// Flood Overlay Layer
// ==========================================
function addFloodOverlay() {
    const floodZones = [
        { name: 'Brahmaputra Flood Zone — Guwahati', coords: [[26.05,91.55],[26.05,91.95],[26.22,91.95],[26.22,91.55]], risk: 'high' },
        { name: 'Barak Valley Flood Zone', coords: [[24.65,92.55],[24.65,92.95],[24.85,92.95],[24.85,92.55]], risk: 'high' },
        { name: 'Imphal River Flooding', coords: [[24.72,93.85],[24.72,94.05],[24.88,94.05],[24.88,93.85]], risk: 'medium' },
        { name: 'Teesta Basin — Sikkim', coords: [[27.15,88.45],[27.15,88.75],[27.4,88.75],[27.4,88.45]], risk: 'medium' },
    ];

    const layers = [];
    floodZones.forEach(zone => {
        const color = zone.risk === 'high' ? '#2563EB' : '#60A5FA';
        const poly = L.polygon(zone.coords, {
            color: color,
            weight: 2,
            fillColor: color,
            fillOpacity: 0.25,
            dashArray: '6 4',
            className: 'flood-polygon',
        });
        poly.bindPopup(`
            <div style="font-family:Oxanium,sans-serif;">
                <strong>🌧️ ${zone.name}</strong><br>
                <span style="font-family:JetBrains Mono,monospace;font-size:12px;">
                    Risk: <b style="color:${color}">${zone.risk.toUpperCase()}</b><br>
                    Status: Active monitoring
                </span>
            </div>
        `);
        layers.push(poly);
    });

    floodLayer = L.layerGroup(layers);
}

// ==========================================
// Hospital & PHC Marker Layer
// ==========================================
function addHospitalLayer() {
    const facilities = [
        { name: 'GMCH — Guwahati',           type: 'hospital', lat: 26.14, lng: 91.72, beds: 1200, icu: true },
        { name: 'Silchar Medical College',     type: 'hospital', lat: 24.82, lng: 92.79, beds: 800,  icu: true },
        { name: 'RIMS — Imphal',              type: 'hospital', lat: 24.81, lng: 93.94, beds: 650,  icu: true },
        { name: 'NEIGRIHMS — Shillong',       type: 'hospital', lat: 25.57, lng: 91.89, beds: 500,  icu: true },
        { name: 'Agartala GBP Hospital',       type: 'hospital', lat: 23.84, lng: 91.28, beds: 400,  icu: true },
        { name: 'Naga Hospital — Kohima',      type: 'hospital', lat: 25.67, lng: 94.11, beds: 300,  icu: false },
        { name: 'PHC Bongaigaon',             type: 'phc', lat: 26.48, lng: 90.56, beds: 30, icu: false },
        { name: 'PHC Tinsukia',               type: 'phc', lat: 27.49, lng: 95.36, beds: 25, icu: false },
        { name: 'PHC Tura',                   type: 'phc', lat: 25.52, lng: 90.22, beds: 20, icu: false },
        { name: 'PHC Dimapur',               type: 'phc', lat: 25.90, lng: 93.73, beds: 35, icu: false },
        { name: 'PHC Aizawl',                type: 'phc', lat: 23.74, lng: 92.72, beds: 28, icu: false },
        { name: 'PHC Gangtok',               type: 'phc', lat: 27.33, lng: 88.62, beds: 22, icu: false },
    ];

    const markers = [];
    facilities.forEach(f => {
        const isHosp = f.type === 'hospital';
        const icon = L.divIcon({
            className: 'hospital-marker',
            html: `<div class="hosp-icon ${isHosp ? 'hosp-big' : 'hosp-small'}">
                       ${isHosp ? '🏥' : '⚕'}
                   </div>`,
            iconSize: [isHosp ? 28 : 22, isHosp ? 28 : 22],
            iconAnchor: [isHosp ? 14 : 11, isHosp ? 14 : 11],
        });

        const m = L.marker([f.lat, f.lng], { icon });
        m.bindPopup(`
            <div style="font-family:Oxanium,sans-serif;min-width:150px;">
                <strong>${isHosp ? '🏥' : '⚕'} ${f.name}</strong><br>
                <span style="font-family:JetBrains Mono,monospace;font-size:12px;">
                    Type: <b>${isHosp ? 'Hospital' : 'PHC'}</b><br>
                    Beds: <b>${f.beds}</b><br>
                    ICU: <b>${f.icu ? '✅ Available' : '❌ None'}</b>
                </span>
            </div>
        `);
        markers.push(m);
    });

    hospitalLayer = L.layerGroup(markers);
}

// ==========================================
// Disease Tracker Rendering
// ==========================================
function renderDiseaseTracker(diseases) {
    if (!diseases) return;

    const nameMap = {
        'Cholera': 'cholera',
        'Typhoid': 'typhoid',
        'Hepatitis A': 'hepatitis',
        'Dysentery': 'dysentery',
    };

    diseases.forEach(d => {
        const key = nameMap[d.name];
        if (!key) return;

        const casesEl = document.getElementById(`dc-${key}`);
        const changeEl = document.getElementById(`dc-${key}-change`);

        if (casesEl) animateCountUp(casesEl, d.cases, 1200);

        if (changeEl) {
            const isUp = d.trend === 'up';
            const arrow = isUp ? '↑' : '↓';
            const color = isUp ? '#D92D20' : '#12B76A';
            changeEl.innerHTML = `<span style="color:${color};font-weight:700;">${arrow} ${Math.abs(d.change)}%</span> vs last week`;
        }
    });
}

// ==========================================
// % Change Badges for Data Tiles
// ==========================================
function addChangeBadges(stats) {
    if (!stats.prev_week) return;

    const tiles = {
        'tile-warnings': ['warnings', stats.warnings, stats.prev_week.warnings],
        'tile-dangers': ['dangers', stats.dangers, stats.prev_week.dangers],
        'tile-monitoring': ['monitoring', stats.monitoring, stats.prev_week.monitoring],
        'tile-contamination': ['contamination_events', stats.contamination_events, stats.prev_week.contamination_events],
        'tile-risk-areas': ['risk_areas', stats.risk_areas, stats.prev_week.risk_areas],
    };

    Object.entries(tiles).forEach(([elId, [key, current, prev]]) => {
        const el = document.getElementById(elId);
        if (!el || prev === 0) return;

        const pctChange = Math.round(((current - prev) / prev) * 100);
        const isUp = pctChange > 0;
        const arrow = isUp ? '↑' : '↓';
        const color = isUp ? '#D92D20' : '#12B76A';

        // Remove existing badge if any
        const existing = el.parentElement.querySelector('.change-badge');
        if (existing) existing.remove();

        const badge = document.createElement('div');
        badge.className = 'change-badge';
        badge.style.color = color;
        badge.innerHTML = `${arrow} ${Math.abs(pctChange)}%`;
        el.parentElement.appendChild(badge);
    });
}

// ==========================================
// Map
// ==========================================
let riverLayers = [];

function initMap() {
    map = L.map('map', {
        center: [26.2006, 92.9376],
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
    });

    // Esri World Topo tile — shows rivers, water bodies, terrain clearly
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
    }).addTo(map);

    // Zoom control - bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add river overlays
    addRivers();
    
    // Add districts if default
    if (mapLayersState.districts) {
        addDistrictChoropleth();
        districtLayer.addTo(map);
    }

    // Add legend
    addMapLegend();
}

// ==========================================
// River Overlays (Major NER Rivers)
// ==========================================
function addRivers() {
    const rivers = [
        {
            name: 'Brahmaputra River',
            color: '#B0D8F0',
            weight: 4,
            coords: [
                [27.98, 97.05], [27.80, 96.20], [27.55, 95.45], [27.48, 94.90],
                [27.30, 94.30], [27.10, 93.80], [26.90, 93.20], [26.75, 92.80],
                [26.55, 92.30], [26.35, 91.80], [26.18, 91.70], [26.10, 91.60],
                [25.95, 91.20], [25.80, 90.60], [25.60, 89.90], [25.30, 89.60],
                [25.10, 89.50], [24.80, 89.70], [24.50, 89.80], [24.10, 89.90],
                [23.80, 90.30], [23.50, 90.50]
            ]
        },
        {
            name: 'Barak River',
            color: '#B0D8F0',
            weight: 3,
            coords: [
                [25.45, 93.95], [25.20, 93.60], [25.00, 93.20], [24.85, 92.90],
                [24.75, 92.70], [24.60, 92.40], [24.50, 92.20], [24.40, 92.00],
                [24.35, 91.80], [24.20, 91.60]
            ]
        },
        {
            name: 'Manas River',
            color: '#B0D8F0',
            weight: 2.5,
            coords: [
                [27.60, 91.20], [27.30, 91.00], [27.00, 90.90], [26.80, 90.80],
                [26.60, 90.70], [26.45, 90.65], [26.30, 90.60]
            ]
        },
        {
            name: 'Subansiri River',
            color: '#B0D8F0',
            weight: 2.5,
            coords: [
                [28.20, 93.80], [28.00, 93.90], [27.70, 94.00], [27.40, 94.10],
                [27.20, 94.05], [27.00, 93.95], [26.80, 93.80], [26.60, 93.60]
            ]
        },
        {
            name: 'Teesta River',
            color: '#B0D8F0',
            weight: 2.5,
            coords: [
                [27.85, 88.70], [27.60, 88.60], [27.30, 88.55], [27.00, 88.50],
                [26.80, 88.55], [26.60, 88.60], [26.30, 88.70], [26.00, 88.80],
                [25.70, 88.85], [25.50, 89.00]
            ]
        },
        {
            name: 'Imphal River',
            color: '#B0D8F0',
            weight: 2,
            coords: [
                [25.10, 94.10], [24.95, 93.95], [24.80, 93.90], [24.65, 93.85],
                [24.50, 93.80], [24.35, 93.75]
            ]
        }
    ];

    rivers.forEach(river => {
        const polyline = L.polyline(river.coords, {
            color: river.color,
            weight: river.weight,
            opacity: 0.45,
            smoothFactor: 2,
            dashArray: null,
            className: 'river-line',
        }).addTo(map);

        polyline.bindPopup(`
            <div class="marker-popup">
                <h4>🌊 ${river.name}</h4>
                <div class="popup-row"><span class="label">Status</span><span class="value">Monitored</span></div>
                <span class="status-badge safe">CLEAN</span>
            </div>
        `, { maxWidth: 220 });

        polyline._riverName = river.name;
        polyline._originalColor = river.color;
        polyline._originalWeight = river.weight;
        riverLayers.push(polyline);
    });
}

// ==========================================
// Pollution Animation on Rivers
// ==========================================
function animateAffectedRiver(lat, lng) {
    // Find nearest river to the alarm location
    let nearestRiver = null;
    let nearestDist = Infinity;

    riverLayers.forEach(river => {
        const latlngs = river.getLatLngs();
        latlngs.forEach(point => {
            const dist = Math.sqrt(Math.pow(point.lat - lat, 2) + Math.pow(point.lng - lng, 2));
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestRiver = river;
            }
        });
    });

    if (nearestRiver && nearestDist < 2.0) {
        // Animate: turn red and pulse
        nearestRiver.setStyle({
            color: '#D92D20',
            weight: nearestRiver._originalWeight + 3,
            opacity: 1,
            dashArray: '10, 8',
        });

        // Update popup to show affected
        nearestRiver.setPopupContent(`
            <div class="marker-popup">
                <h4>⚠️ ${nearestRiver._riverName}</h4>
                <div class="popup-row"><span class="label">Status</span><span class="value" style="color:#D92D20;font-weight:700">CONTAMINATION DETECTED</span></div>
                <span class="status-badge danger">AFFECTED</span>
            </div>
        `);

        // Pulse animation via CSS class
        const el = nearestRiver.getElement();
        if (el) el.classList.add('river-affected');

        // Revert after 15 seconds
        setTimeout(() => {
            nearestRiver.setStyle({
                color: nearestRiver._originalColor,
                weight: nearestRiver._originalWeight,
                opacity: 0.45,
                dashArray: null,
            });
            nearestRiver.setPopupContent(`
                <div class="marker-popup">
                    <h4>🌊 ${nearestRiver._riverName}</h4>
                    <div class="popup-row"><span class="label">Status</span><span class="value">Monitored</span></div>
                    <span class="status-badge safe">CLEAN</span>
                </div>
            `);
            if (el) el.classList.remove('river-affected');
        }, 15000);
    }
}

// ==========================================
// Map Legend
// ==========================================
function addMapLegend() {
    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <h4>🗺️ Legend</h4>
            <div class="legend-row"><span class="legend-swatch" style="background:#A8D5A2;"></span> Land</div>
            <div class="legend-row"><span class="legend-swatch" style="background:#AAD3DF;"></span> Water Bodies</div>
            <div class="legend-row"><span class="legend-swatch river-swatch" style="background:#1E90FF;"></span> Rivers</div>
            <div class="legend-row"><span class="legend-dot" style="background:#D92D20;"></span> Danger Zone</div>
            <div class="legend-row"><span class="legend-dot" style="background:#E68A00;"></span> Warning Zone</div>
            <div class="legend-row"><span class="legend-dot" style="background:#12B76A;"></span> Safe Zone</div>
            <div class="legend-row"><span class="legend-dot" style="background:#0077CC;"></span> Officer</div>
            <div class="legend-row"><span class="legend-dot" style="background:#8250C8;"></span> Task</div>
            <div class="legend-row"><span class="legend-swatch river-swatch" style="background:#D92D20;border-style:dashed;"></span> Affected River</div>
        `;
        return div;
    };

    legend.addTo(map);
}

function createLabeledIcon(riskLevel, label) {
    const colorMap = { danger: '#D92D20', warning: '#E68A00', safe: '#12B76A' };
    const color = colorMap[riskLevel] || '#0077CC';
    const size = riskLevel === 'danger' ? 18 : riskLevel === 'warning' ? 14 : 12;
    const ringSize = size + 10;

    return L.divIcon({
        className: '',
        html: `<div style="position:relative;width:${ringSize}px;height:${ringSize}px;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:${ringSize}px;height:${ringSize}px;border-radius:50%;background:${color};opacity:0.15;animation:markerPulse 2s ease infinite;"></div>
            <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);position:relative;z-index:1;"></div>
        </div>`,
        iconSize: [ringSize, ringSize],
        iconAnchor: [ringSize/2, ringSize/2],
    });
}

function createOfficerIcon() {
    return L.divIcon({
        className: '',
        html: `<div style="
            background:rgba(0,119,204,0.12);border:2px solid #0077CC;color:#0077CC;
            border-radius:20px;padding:3px 8px;font-size:10px;font-weight:700;
            font-family:'JetBrains Mono',monospace;white-space:nowrap;
            display:flex;align-items:center;gap:4px;
            box-shadow:0 2px 8px rgba(0,0,0,0.12);
        ">👤 OFC</div>`,
        iconSize: [55, 24],
        iconAnchor: [27, 12],
    });
}

function createTaskIcon() {
    return L.divIcon({
        className: '',
        html: `<div style="
            background:rgba(130,80,200,0.12);border:2px solid #8250C8;color:#8250C8;
            border-radius:20px;padding:3px 8px;font-size:10px;font-weight:700;
            font-family:'JetBrains Mono',monospace;white-space:nowrap;
            display:flex;align-items:center;gap:4px;
            box-shadow:0 2px 8px rgba(0,0,0,0.12);
        ">📋 TASK</div>`,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
    });
}

function addMapMarkers(stateData) {
    // Clear old markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    Object.entries(stateData).forEach(([state, data]) => {
        // --- Sensor marker ---
        const icon = createLabeledIcon(data.risk_level, state);
        const marker = L.marker([data.lat, data.lng], { icon }).addTo(map);

        const statusClass = data.risk_level;
        const statusLabel = data.risk_level.toUpperCase();

        marker.on('click', () => {
            openMarkerInfo(data, state);
        });

        marker._riskLevel = data.risk_level;
        marker._category = 'sensor';
        markers.push(marker);

        // --- Officer marker (offset slightly) ---
        const officerMarker = L.marker([data.lat + 0.15, data.lng + 0.2], { icon: createOfficerIcon() }).addTo(map);
        officerMarker.bindPopup(`
            <div class="marker-popup">
                <h4>👤 Field Officer — ${data.city}</h4>
                <div class="popup-row"><span class="label">Assigned To</span><span class="value">${state} Region</span></div>
                <div class="popup-row"><span class="label">Duty</span><span class="value">Water Quality Inspection</span></div>
                <div class="popup-row"><span class="label">Status</span><span class="value" style="color:#12B76A;font-weight:600;">ON DUTY</span></div>
            </div>
        `, { maxWidth: 250 });
        officerMarker._riskLevel = data.risk_level;
        officerMarker._category = 'officer';
        markers.push(officerMarker);

        // --- Task marker (offset other direction, only for danger/warning) ---
        if (data.risk_level === 'danger' || data.risk_level === 'warning') {
            const taskMarker = L.marker([data.lat - 0.15, data.lng - 0.2], { icon: createTaskIcon() }).addTo(map);
            taskMarker.bindPopup(`
                <div class="marker-popup">
                    <h4>📋 Active Task — ${data.city}</h4>
                    <div class="popup-row"><span class="label">Task</span><span class="value">${data.risk_level === 'danger' ? 'Emergency Response' : 'Routine Check'}</span></div>
                    <div class="popup-row"><span class="label">Priority</span><span class="value" style="color:${data.risk_level === 'danger' ? '#D92D20' : '#E68A00'};font-weight:600;">${data.risk_level === 'danger' ? 'CRITICAL' : 'MEDIUM'}</span></div>
                    <div class="popup-row"><span class="label">Status</span><span class="value">IN PROGRESS</span></div>
                </div>
            `, { maxWidth: 250 });
            taskMarker._riskLevel = data.risk_level;
            taskMarker._category = 'task';
            markers.push(taskMarker);
        }
    });
}

// ==========================================
// Data Loading
// ==========================================
async function loadStats() {
    try {
        const res = await fetch('/api/stats');
        const stats = await res.json();

        // Animated KPI cards
        animateCountUp(document.getElementById('kpi-sources'), stats.active_sources);
        animateCountUp(document.getElementById('kpi-tests'), stats.tests_conducted);
        animateCountUp(document.getElementById('kpi-supplies'), stats.supplies_deployed);
        animateCountUp(document.getElementById('kpi-facilities'), stats.facilities_monitored);

        // Animated Data Overview tiles
        animateCountUp(document.getElementById('tile-warnings'), stats.warnings);
        animateCountUp(document.getElementById('tile-dangers'), stats.dangers);
        animateCountUp(document.getElementById('tile-monitoring'), stats.monitoring);
        animateCountUp(document.getElementById('tile-contamination'), stats.contamination_events);
        animateCountUp(document.getElementById('tile-risk-areas'), stats.risk_areas);
        animateCountUp(document.getElementById('tile-risk-points'), stats.risk_points);
        animateCountUp(document.getElementById('tile-resolved'), stats.resolved);

        // Cache stats for full-page views
        cachedStats = stats;

        // Add map markers
        if (stats.state_data) {
            addMapMarkers(stats.state_data);
        }

        // Add heatmap layer
        if (stats.heatmap_data) {
            addHeatmapLayer(stats.heatmap_data);
        }

        // Disease tracker
        renderDiseaseTracker(stats.disease_tracker);

        // % change badges
        addChangeBadges(stats);

        // Build charts
        buildWeeklyChart(stats.weekly_risk);
        buildOperationChart(stats.operation_tickets);

        // Phase 2 renderers
        if (stats.wqi_timeline) buildWQIChart(stats.wqi_timeline);
        buildWQIGauges();
        if (stats.officers) renderOfficerTable(stats.officers);
        if (stats.danger_sources) renderDangerSource(stats.danger_sources);
        if (stats.risk_summary) renderRiskSummary(stats.risk_summary);

        // Phase 5 renderers
        if (stats.risk_prediction) renderRiskBadge(stats.risk_prediction);
        if (stats.audit_trail) { window._auditData = stats.audit_trail; renderAuditTrail(stats.audit_trail); }

        showToast('Dashboard data loaded', 'success', 2000);

    } catch (err) {
        console.error('Failed to load stats:', err);
        showToast('Failed to load data', 'error');
    }
}

async function loadAlarms() {
    try {
        const res = await fetch('/api/alarms');
        const data = await res.json();

        renderAlarmFeed(data.alarms);
        updateAlarmButton(data);
        buildAlarmDonut(data.completed_pct, data.uncompleted_pct);

    } catch (err) {
        console.error('Failed to load alarms:', err);
    }
}

// ==========================================
// Charts
// ==========================================
function buildWeeklyChart(data) {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;

    if (chartInstances.weekly) chartInstances.weekly.destroy();

    const T = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

    chartInstances.weekly = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    type: 'line',
                    label: 'Risk Level',
                    data: data.danger,
                    borderColor: '#ef4444',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    type: 'bar',
                    label: 'Warnings',
                    data: data.delayed,
                    backgroundColor: '#1f2937',
                    borderRadius: 2,
                },
                {
                    type: 'bar',
                    label: 'Resolved',
                    data: data.resolved,
                    backgroundColor: '#93c5fd',
                    borderRadius: 2,
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1200, easing: 'easeOutQuart' },
            plugins: { legend: { display: true, position: 'top', labels: { color: '#4b5563', font: { size: 10, family: 'Inter' }, usePointStyle: true, boxWidth: 8 } } },
            scales: {
                x: { stacked: true, ticks: { color: '#6b7280', font: { size: 9 } }, grid: { display: false } },
                y: { stacked: false, ticks: { color: '#6b7280', font: { size: 9 } }, grid: { color: '#e5e7eb', drawBorder: false } },
            }
        }
    });
}

function buildOperationChart(data) {
    const ctx = document.getElementById('operationChart');
    if (!ctx) return;

    if (chartInstances.operation) chartInstances.operation.destroy();

    chartInstances.operation = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Inspection', data: data.inspection, backgroundColor: 'rgba(0, 212, 255, 0.6)', borderRadius: 3 },
                { label: 'Maintenance', data: data.maintenance, backgroundColor: 'rgba(255, 149, 0, 0.6)', borderRadius: 3 },
                { label: 'Emergency', data: data.emergency, backgroundColor: 'rgba(255, 59, 48, 0.6)', borderRadius: 3 },
                { label: 'Resolved', data: data.resolved, backgroundColor: 'rgba(52, 199, 89, 0.6)', borderRadius: 3 },
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000 },
            plugins: { legend: { display: true, labels: { color: '#5A7A9A', font: { size: 8, family: 'JetBrains Mono' } } } },
            scales: {
                x: { stacked: true, ticks: { color: '#5A7A9A', font: { size: 9 } }, grid: { color: 'rgba(0,40,80,0.06)' } },
                y: { stacked: true, ticks: { color: '#5A7A9A', font: { size: 9 } }, grid: { display: false } },
            }
        }
    });
}

function buildAlarmDonut(completedPct, uncompletedPct) {
    // Completed donut
    const ctx1 = document.getElementById('donutCompleted');
    if (!ctx1) return;
    if (chartInstances.donut1) chartInstances.donut1.destroy();
    if (chartInstances.donut2) chartInstances.donut2.destroy();

    chartInstances.donut1 = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [completedPct, 100 - completedPct],
                backgroundColor: ['#12B76A', 'rgba(0,40,80,0.06)'],
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '70%',
            responsive: false,
            animation: { animateRotate: true, duration: 1500 },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
            }
        },
        plugins: [{
            id: 'centerText',
            afterDraw(chart) {
                const { ctx, chartArea } = chart;
                const cx = (chartArea.left + chartArea.right) / 2;
                const cy = (chartArea.top + chartArea.bottom) / 2;
                ctx.save();
                ctx.font = 'bold 16px Oxanium';
                ctx.fillStyle = '#34C759';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(completedPct + '%', cx, cy);
                ctx.restore();
            }
        }]
    });

    // Uncompleted donut
    const ctx2 = document.getElementById('donutUncompleted');
    if (!ctx2) return;

    chartInstances.donut2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [uncompletedPct, 100 - uncompletedPct],
                backgroundColor: ['#E68A00', 'rgba(0,40,80,0.06)'],
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '70%',
            responsive: false,
            animation: { animateRotate: true, duration: 1500 },
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
        },
        plugins: [{
            id: 'centerText2',
            afterDraw(chart) {
                const { ctx, chartArea } = chart;
                const cx = (chartArea.left + chartArea.right) / 2;
                const cy = (chartArea.top + chartArea.bottom) / 2;
                ctx.save();
                ctx.font = 'bold 16px Oxanium';
                ctx.fillStyle = '#FF9500';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(uncompletedPct + '%', cx, cy);
                ctx.restore();
            }
        }]
    });
}

function buildDangerGauge(activeCount) {
    const ctx = document.getElementById('dangerGauge');
    if (!ctx) return;
    if (chartInstances.dangerGauge) chartInstances.dangerGauge.destroy();

    chartInstances.dangerGauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Level-1', 'Level-2'],
            datasets: [{
                data: [75, 15],
                backgroundColor: ['rgba(255,59,48,0.8)', 'rgba(255,149,0,0.8)'],
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '65%',
            responsive: false,
            animation: { animateRotate: true, duration: 1200 },
            plugins: {
                legend: { display: true, position: 'bottom', labels: { color: '#5A7A9A', font: { size: 9, family: 'JetBrains Mono' } } },
                tooltip: { enabled: true },
            }
        },
        plugins: [{
            id: 'dangerCenter',
            afterDraw(chart) {
                const { ctx, chartArea } = chart;
                const cx = (chartArea.left + chartArea.right) / 2;
                const cy = (chartArea.top + chartArea.bottom) / 2;
                ctx.save();
                ctx.font = 'bold 20px Oxanium';
                ctx.fillStyle = '#FF3B30';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(activeCount || '100', cx, cy - 6);
                ctx.font = '9px JetBrains Mono';
                ctx.fillStyle = '#5A7A9A';
                ctx.fillText('Active', cx, cy + 12);
                ctx.restore();
            }
        }]
    });
}

// ==========================================
// WQI 30-Day Timeline Chart
// ==========================================
let wqiChartInstance = null;
let wqiDatasets = {};

function buildWQIChart(data) {
    const ctx = document.getElementById('wqiChart');
    if (!ctx) return;
    if (wqiChartInstance) wqiChartInstance.destroy();

    const colors = {
        ph:       { border: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
        turbidity:{ border: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
        ecoli:    { border: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
        chlorine: { border: '#10B981', bg: 'rgba(16,185,129,0.1)' },
        do:       { border: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
        temp:     { border: '#EC4899', bg: 'rgba(236,72,153,0.1)' },
    };

    const datasets = Object.keys(colors).map(key => ({
        label: key.toUpperCase(),
        data: data[key],
        borderColor: colors[key].border,
        backgroundColor: colors[key].bg,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
        tension: 0.4,
        fill: false,
        hidden: !document.querySelector(`.wqi-toggle[data-param="${key}"]`)?.classList.contains('active'),
    }));

    // Threshold line at 70
    const thresholdData = Array(30).fill(70);
    datasets.push({
        label: 'Unsafe Threshold',
        data: thresholdData,
        borderColor: '#D92D20',
        borderWidth: 1,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
    });

    wqiChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels: data.labels.map((_, i) => i + 1), datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1200, easing: 'easeOutCubic' },
            scales: {
                x: { display: true, ticks: { font: { size: 8 }, maxTicksLimit: 10, color: '#6B7C94' }, grid: { display: false } },
                y: { min: 0, max: 100, ticks: { font: { size: 8 }, stepSize: 25, color: '#6B7C94' }, grid: { color: 'rgba(0,40,80,0.06)' } },
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    titleColor: '#1a3a5c',
                    bodyColor: '#1a3a5c',
                    borderColor: 'rgba(0,119,204,0.2)',
                    borderWidth: 1,
                    titleFont: { family: 'Oxanium' },
                    bodyFont: { family: 'JetBrains Mono', size: 11 },
                },
            },
        },
    });

    wqiDatasets = colors;
}

function toggleWQILine(param, btn) {
    if (!wqiChartInstance) return;
    btn.classList.toggle('active');

    const paramNames = { ph: 'PH', turbidity: 'TURBIDITY', ecoli: 'ECOLI', chlorine: 'CHLORINE', do: 'DO', temp: 'TEMP' };
    const label = paramNames[param];

    wqiChartInstance.data.datasets.forEach(ds => {
        if (ds.label === label) {
            ds.hidden = !btn.classList.contains('active');
        }
    });
    wqiChartInstance.update();
}

// ==========================================
// Field Officer Activity Table
// ==========================================
function renderOfficerTable(officers) {
    const tbody = document.getElementById('officer-tbody');
    if (!tbody) return;

    const statusColors = {
        'active':   { bg: '#12B76A', label: 'Active' },
        'on-scene': { bg: '#E68A00', label: 'On Scene' },
        'off-duty': { bg: '#9CA3AF', label: 'Off Duty' },
    };

    tbody.innerHTML = officers.map(o => {
        const s = statusColors[o.status] || statusColors['off-duty'];
        return `<tr>
            <td style="font-weight:600;">${o.name}</td>
            <td>${o.zone}</td>
            <td>${o.checkin}</td>
            <td><span class="officer-status" style="background:${s.bg}20;color:${s.bg};border:1px solid ${s.bg}40;"><span style="width:6px;height:6px;border-radius:50%;background:${s.bg};display:inline-block;margin-right:4px;"></span>${s.label}</span></td>
        </tr>`;
    }).join('');
}

function buildWQIGauges() {
    const gauges = [
        { id: 'wqiGauge1', value: 42, color: '#ef4444' },
        { id: 'wqiGauge2', value: 88, color: '#10b981' },
        { id: 'wqiGauge3', value: 65, color: '#f59e0b' }
    ];

    gauges.forEach(g => {
        const ctx = document.getElementById(g.id);
        if (!ctx) return;
        
        if (chartInstances[g.id]) chartInstances[g.id].destroy();
        
        chartInstances[g.id] = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [g.value, 100 - g.value],
                    backgroundColor: [g.color, '#e2e8f0'],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: { tooltip: { enabled: false }, legend: { display: false } }
            }
        });
    });
}

// ==========================================
// Dynamic Danger Source Table
// ==========================================
function renderDangerSource(sources) {
    const tbody = document.getElementById('danger-tbody');
    if (!tbody) return;

    tbody.innerHTML = sources.map(s => {
        const isDanger = s.status === 'danger';
        const rowClass = isDanger ? 'danger-row' : 'safe-row';
        const valueClass = isDanger ? 'out-of-range' : '';
        return `<tr class="${rowClass}" onclick="flyToSensor(${s.lat}, ${s.lng}, '${s.device}')" style="cursor:pointer;">
            <td style="font-weight: 500;">${s.device}</td>
            <td>${s.type}</td>
            <td class="${valueClass}" style="font-weight: 600;">${s.value} ${s.unit}</td>
            <td style="color: #6b7280;">${s.range}</td>
            <td style="text-align: center;"><button class="btn-download" onclick="event.stopPropagation(); downloadSensorCSV('${s.device}', '${s.type}', '${s.value}', '${s.unit}');" title="Download Sensor Data">⬇</button></td>
        </tr>`;
    }).join('');
}

function flyToSensor(lat, lng, device) {
    if (!map) return;
    map.flyTo([lat, lng], 10, { duration: 1.5 });
    showToast(`Flying to sensor ${device}`, 'info', 1500);
}

// ==========================================
// Risk Resolved Summary Line
// ==========================================
function renderRiskSummary(summary) {
    const el = document.getElementById('risk-summary');
    if (!el) return;

    el.innerHTML = `
        <span style="color:#12B76A;">✅ ${summary.resolved} resolved</span> ·
        <span style="color:#E68A00;">⏳ ${summary.pending} pending</span> ·
        <span style="color:#D92D20;">🔺 ${summary.escalated} escalated</span>
    `;
}
// ==========================================
function renderAlarmFeed(alarms) {
    const feed = document.getElementById('alarm-feed');
    const modalFeed = document.getElementById('modal-alarm-feed');

    const buildItems = (container) => {
        if (!container) return;
        container.innerHTML = '';
        alarms.forEach(alarm => {
            if (alarm.status === 'done') return; // Only show active in the clean view
            const item = document.createElement('div');
            item.className = `clean-alarm-item`;
            item.style.padding = "8px 0";
            item.style.borderBottom = "1px solid #e5e7eb";
            item.style.fontSize = "0.85rem";
            item.style.color = "#1f2937";
            item.innerHTML = `
                <span style="font-weight: 600;">${alarm.loc}</span> - ${alarm.type} 
                <a href="#" onclick="openDispatch('${alarm.loc}','${alarm.type}')" style="color: #3b82f6; text-decoration: none; font-weight: 600; margin-left: 4px;">(Action)</a>
            `;
            container.appendChild(item);
        });
    };

    buildItems(feed);
    buildItems(modalFeed);
    buildDangerGauge(alarms.filter(a => a.status === 'pending').length);
}

function updateAlarmButton(data) {
    const btn = document.getElementById('alarm-main-btn');
    if (!btn) return;

    const hasActive = data.uncompleted_pct > 0;
    btn.className = `alarm-btn ${hasActive ? '' : 'safe'}`;

    const bellIcon = btn.querySelector('.bell-icon');
    if (bellIcon) bellIcon.className = `bell-icon ${hasActive ? 'shaking' : ''}`;

    const statusText = btn.querySelector('.alarm-text');
    if (statusText) statusText.textContent = `${data.completed_pct}% | ${data.uncompleted_pct}%`;
}

async function toggleAlarmStatus(id) {
    try {
        await fetch(`/api/alarms/${id}/toggle`, { method: 'POST' });
        loadAlarms();
        showToast('Alarm status updated', 'success', 1500);
    } catch (err) {
        console.error('Failed to toggle alarm:', err);
    }
}

function escalateAlarm(id) {
    showToast(`Alarm #${id} escalated to Level 2 — District Health Officer notified`, 'warning', 3000);
}

// ==========================================
// Dispatch Alert System
// ==========================================
function openDispatch(loc, type) {
    const msg = document.getElementById('dispatch-msg');
    if (msg) msg.value = `Urgent: ${type} alert at ${loc}. Please report immediately for inspection and water sampling.`;
    openModal('dispatchModal');
}

function sendDispatch(method) {
    const officer = document.getElementById('dispatch-officer')?.value;
    closeModal('dispatchModal');
    const channel = method === 'whatsapp' ? 'WhatsApp' : 'SMS';
    showToast(`${channel} alert sent to ${officer}`, 'success', 3000);
}

// ==========================================
// SOP Checklist Drawer
// ==========================================
function openSopDrawer(alarmType) {
    const drawer = document.getElementById('sop-drawer');
    const typeEl = document.getElementById('sop-type');

    // Set SOP type based on alarm
    const sopMap = {
        'E.Coli Detected': 'E.Coli Detection Protocol',
        'High Turbidity': 'Turbidity Alert Protocol',
        'pH Anomaly': 'pH Anomaly Protocol',
        'Cholera Suspected': 'Cholera Response Protocol',
        'Typhoid Suspected': 'Typhoid Response Protocol',
        'Flood Risk': 'Flood Risk Protocol',
        'Cybersecurity Breach': 'Cyber Incident Protocol',
    };
    if (typeEl) typeEl.textContent = sopMap[alarmType] || `${alarmType} Protocol`;

    // Dynamic Steps Replacement for Cyber
    const sopStepsEl = document.getElementById('sop-steps');
    if (sopStepsEl) {
        if (alarmType === 'Cybersecurity Breach' || alarmType.includes('Tamper') || alarmType.includes('Injection')) {
            sopStepsEl.innerHTML = `
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Isolate compromised sensor subnet immediately</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Invalidate active JWT sessions for affected users</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Verify SHA-256 System Audit Trail Integrity</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Engage WAF strict mode (rate-limiting max)</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Dispatch field inspector to physical sensor location</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Generate NCIIPC Compliance Report</label>
            `;
        } else {
            // Default Water Safety SOP
            sopStepsEl.innerHTML = `
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Isolate water source immediately</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Notify District Health Officer</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Collect confirmation samples (x3)</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Issue boil water advisory to affected zone</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Deploy water tanker supply</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Begin chlorination treatment</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Retest after 48 hours</label>
                <label class="sop-step"><input type="checkbox" onchange="updateSopProgress()"> Submit incident report</label>
            `;
        }
    }

    // Reset all checkboxes
    document.querySelectorAll('#sop-steps input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateSopProgress();

    if (drawer) drawer.classList.add('open');
}

function closeSopDrawer() {
    const drawer = document.getElementById('sop-drawer');
    if (drawer) drawer.classList.remove('open');
}

function updateSopProgress() {
    const checks = document.querySelectorAll('#sop-steps input[type="checkbox"]');
    const done = [...checks].filter(c => c.checked).length;
    const total = checks.length;

    const bar = document.getElementById('sop-progress');
    const text = document.getElementById('sop-progress-text');
    if (bar) bar.style.width = `${(done / total) * 100}%`;
    if (text) text.textContent = `${done}/${total} steps completed`;
}

function submitSopReport() {
    const checks = document.querySelectorAll('#sop-steps input[type="checkbox"]');
    const done = [...checks].filter(c => c.checked).length;
    if (done < checks.length) {
        showToast(`${checks.length - done} steps remaining — complete all before submitting`, 'warning');
        return;
    }
    closeSopDrawer();
    showToast('SOP Report submitted successfully', 'success');
}

// ==========================================
// Public Advisory System
// ==========================================
function publishAdvisory() {
    const text = document.getElementById('advisory-compose-text')?.value;
    const zones = document.getElementById('advisory-zones')?.value;
    const severity = document.getElementById('advisory-severity')?.value;

    if (!text) { showToast('Please enter advisory text', 'warning'); return; }

    const banner = document.getElementById('advisory-banner');
    const bannerText = document.getElementById('advisory-text');

    if (bannerText) bannerText.textContent = `${text} — ${zones || 'All Zones'} — Issued ${new Date().toLocaleDateString()}`;
    if (banner) {
        banner.style.display = 'flex';
        banner.className = `advisory-banner advisory-${severity}`;
        banner.style.animation = 'slideDown 0.4s ease';
    }

    closeModal('advisoryModal');
    showToast('Advisory published site-wide', 'warning', 3000);
}

function withdrawAdvisory() {
    if (!confirm('Withdraw this advisory?')) return;
    const banner = document.getElementById('advisory-banner');
    if (banner) banner.style.display = 'none';
    showToast('Advisory withdrawn', 'info', 2000);
}

async function submitManualAlarm() {
    const loc = document.getElementById('alarm-location').value;
    const type = document.getElementById('alarm-type').value;
    const severity = document.querySelector('input[name="alarm-sev"]:checked')?.value || 'warning';
    const notes = document.getElementById('alarm-notes').value;

    if (!loc) { showToast('Please enter a location', 'warning'); return; }

    try {
        await fetch('/api/alarms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: loc, type, severity, notes }),
        });

        // Clear form
        document.getElementById('alarm-location').value = '';
        document.getElementById('alarm-notes').value = '';

        loadAlarms();
        closeModal('alarmModal');
        showToast(`Alarm submitted: ${type} at ${loc}`, 'success');

        // Trigger river pollution animation based on location
        const coords = getLocationCoords(loc);
        if (coords) {
            animateAffectedRiver(coords[0], coords[1]);
        }
    } catch (err) {
        console.error('Failed to submit alarm:', err);
        showToast('Failed to submit alarm', 'error');
    }
}

// Lookup table for NER locations → approximate coordinates
function getLocationCoords(locationName) {
    const locationMap = {
        'guwahati':     [26.14, 91.73],
        'dibrugarh':    [27.47, 94.91],
        'tezpur':       [26.66, 92.78],
        'silchar':      [24.83, 92.78],
        'jorhat':       [26.75, 94.22],
        'nagaon':       [26.35, 92.68],
        'itanagar':     [27.08, 93.61],
        'shillong':     [25.57, 91.88],
        'imphal':       [24.82, 93.95],
        'agartala':     [23.83, 91.28],
        'kohima':       [25.67, 94.11],
        'aizawl':       [23.74, 92.72],
        'gangtok':      [27.33, 88.62],
        'dimapur':      [25.90, 93.73],
        'tura':         [25.52, 90.22],
        'tinsukia':     [27.49, 95.36],
        'bongaigaon':   [26.48, 90.56],
        'karimganj':    [24.87, 92.35],
        'siliguri':     [26.71, 88.43],
        'darjeeling':   [27.04, 88.26],
    };

    const lower = locationName.toLowerCase();
    for (const [key, coords] of Object.entries(locationMap)) {
        if (lower.includes(key)) return coords;
    }
    return null;
}

// ==========================================
// Phase 5: Predictive Risk Badge
// ==========================================
function renderRiskBadge(prediction) {
    const el = document.getElementById('risk-badge-score');
    const badge = document.getElementById('risk-badge');
    if (!el || !badge) return;

    const score = prediction.score;
    animateCountUp(el, score);

    // Color based on score
    badge.classList.remove('risk-low', 'risk-med', 'risk-high');
    if (score >= 70) badge.classList.add('risk-high');
    else if (score >= 40) badge.classList.add('risk-med');
    else badge.classList.add('risk-low');

    badge.title = `AI Risk: ${score}/100 (${prediction.confidence}% confidence)\n${prediction.next_24h}`;
}

// ==========================================
// Phase 5: Role Switcher
// ==========================================
let currentRole = 'viewer';

function getInternalRole(backendRole) {
    if (backendRole === "Admin") return "admin";
    if (backendRole === "District Officer") return "officer";
    if (backendRole === "Field Inspector") return "inspector";
    return "viewer";
}

function applyRole(backendRole) {
    const roleStr = backendRole || localStorage.getItem('user_role') || 'Public View';
    currentRole = getInternalRole(roleStr);

    // Show/hide all data-role tagged elements
    document.querySelectorAll('[data-role]').forEach(el => {
        const allowedRoles = el.getAttribute('data-role').split(' ');
        if (allowedRoles.includes(currentRole)) {
            el.style.display = '';
            el.classList.remove('role-hidden');
        } else {
            el.style.display = 'none';
            el.classList.add('role-hidden');
        }
    });

    // Viewer: hide alarm feed items (read-only, no actions)
    const alarmFeed = document.getElementById('alarm-feed');
    const alarmActions = alarmFeed?.querySelectorAll('.alarm-actions');
    if (alarmActions) {
        alarmActions.forEach(a => a.style.display = currentRole === 'viewer' ? 'none' : '');
    }

    // Role-specific badges and messages
    const roleBadges = {
        admin:   { icon: '👑', color: '#FFD700' },
        officer: { icon: '🏛️', color: '#0077CC' },
        inspector: { icon: '👷', color: '#FF9500' },
        viewer:  { icon: '👁️', color: '#888888' },
    };
    
    const finalRoleStr = backendRole || localStorage.getItem('user_role') || 'Public View';
    document.getElementById('role-text').innerText = finalRoleStr;
    document.getElementById('role-text').style.color = roleBadges[currentRole]?.color || '#888';
    document.getElementById('role-icon').innerText = roleBadges[currentRole]?.icon || '👤';
}

// ==========================================
// Phase 5: Data Upload Portal
// ==========================================
let selectedFile = null;

function handleFileDrop(e) {
    e.preventDefault();
    document.getElementById('upload-zone')?.classList.remove('drag-over');
    const file = e.dataTransfer?.files[0];
    if (file) showFileInfo(file);
}

function handleFileSelect(input) {
    const file = input.files[0];
    if (file) showFileInfo(file);
}

function showFileInfo(file) {
    selectedFile = file;
    const info = document.getElementById('upload-file-info');
    const name = document.getElementById('upload-filename');
    const size = document.getElementById('upload-filesize');

    if (info) info.style.display = 'flex';
    if (name) name.textContent = `📄 ${file.name}`;
    if (size) size.textContent = `${(file.size / 1024).toFixed(1)} KB`;
}

function uploadFile() {
    if (!selectedFile) { showToast('Please select a file first', 'warning'); return; }

    // Simulate upload
    showToast(`Uploading ${selectedFile.name}...`, 'info', 2000);

    setTimeout(() => {
        showToast(`${selectedFile.name} uploaded — ${Math.floor(Math.random() * 2000 + 500)} rows processed`, 'success', 3000);
        closeModal('uploadModal');
        selectedFile = null;

        const info = document.getElementById('upload-file-info');
        if (info) info.style.display = 'none';
    }, 2000);
}

// ==========================================
// Phase 5: Auto PDF Report Generator
// ==========================================
function generatePDFReport() {
    if (typeof window.jspdf === 'undefined') {
        showToast('PDF library loading, try again in a moment', 'warning');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const stats = cachedStats || {};

    // Header
    doc.setFillColor(10, 14, 26);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(0, 209, 210);
    doc.setFontSize(20);
    doc.text('AquaGuard Report', 14, 18);
    doc.setFontSize(10);
    doc.setTextColor(180, 190, 210);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    // KPIs
    doc.setTextColor(30, 40, 60);
    doc.setFontSize(14);
    doc.text('Key Performance Indicators', 14, 48);
    doc.setFontSize(10);
    const kpis = [
        `Active Water Sources: ${stats.active_sources || '—'}`,
        `Tests Conducted: ${stats.tests_conducted || '—'}`,
        `Warnings Issued: ${stats.warnings || '—'}`,
        `Danger Zones: ${stats.dangers || '—'}`,
        `Monitoring Sites: ${stats.monitoring || '—'}`,
        `Contamination Events: ${stats.contamination || '—'}`,
    ];
    kpis.forEach((k, i) => doc.text(k, 14, 58 + i * 7));

    // Risk Prediction
    const rp = stats.risk_prediction;
    if (rp) {
        doc.setFontSize(14);
        doc.text('AI Risk Prediction', 14, 110);
        doc.setFontSize(10);
        doc.text(`Score: ${rp.score}/100 (${rp.confidence}% confidence)`, 14, 120);
        doc.text(`Forecast: ${rp.next_24h}`, 14, 127);
    }

    // Danger Sources
    if (stats.danger_sources) {
        doc.setFontSize(14);
        doc.text('Danger Source Summary', 14, 142);
        doc.setFontSize(9);
        stats.danger_sources.forEach((d, i) => {
            doc.text(`${d.device} — ${d.type}: ${d.value} ${d.unit} [${d.status.toUpperCase()}]`, 14, 152 + i * 6);
        });
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('AquaGuard — Water Disease Early Warning System | Auto-generated report', 14, 285);

    doc.save('AquaGuard_Report.pdf');
    showToast('PDF report generated & downloaded', 'success', 3000);
}

// ==========================================
// Phase 5: Audit Trail Log
// ==========================================
function renderAuditTrail(logs) {
    const tbody = document.getElementById('audit-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    logs.forEach(log => {
        const roleColor = { admin: '#D92D20', officer: '#0077CC', system: '#8250C8' };
        const tr = document.createElement('tr');
        tr.className = `audit-row audit-${log.role}`;
        tr.innerHTML = `
            <td><span style="font-size:0.65rem;color:var(--text-muted);">${log.date}</span><br><strong>${log.time}</strong></td>
            <td>${log.user}</td>
            <td><span class="audit-role-badge" style="background:${roleColor[log.role] || '#666'}20;color:${roleColor[log.role] || '#666'};border:1px solid ${roleColor[log.role] || '#666'}40;">${log.role}</span></td>
            <td style="font-size:0.65rem;">${log.action}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filterAudit(role, btn) {
    document.querySelectorAll('.audit-filter').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const logs = window._auditData || [];
    const filtered = role === 'all' ? logs : logs.filter(l => l.role === role);
    renderAuditTrail(filtered);
}

// ==========================================
// AI Prediction
// ==========================================
async function runPrediction() {
    const ph = parseFloat(document.getElementById('pred-ph').value);
    const turbidity = parseFloat(document.getElementById('pred-turbidity').value);
    const nitrate = parseFloat(document.getElementById('pred-nitrate').value);
    const bacteria = parseFloat(document.getElementById('pred-bacteria').value);
    const rainfall = parseFloat(document.getElementById('pred-rainfall').value);
    const temp = parseFloat(document.getElementById('pred-temp').value);

    const resultDiv = document.getElementById('predict-result');
    const T = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

    resultDiv.style.display = 'none';
    resultDiv.className = 'predict-result';

    try {
        const res = await fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ph, turbidity, nitrate, bacteria, rainfall, temp }),
        });
        const data = await res.json();

        if (data.error) {
            resultDiv.innerHTML = `<div class="result-title" style="color:#FF3B30;">Error: ${data.error}</div>`;
            resultDiv.className = 'predict-result high-risk';
            resultDiv.style.display = 'block';
            return;
        }

        if (data.risk === 1) {
            resultDiv.className = 'predict-result high-risk';
            resultDiv.innerHTML = `
                <div class="result-title" style="color:#FF3B30;">${T.highRisk}</div>
                <div class="result-prob">${T.likelihood}: ${data.probability}%</div>
            `;
        } else {
            resultDiv.className = 'predict-result stable';
            resultDiv.innerHTML = `
                <div class="result-title" style="color:#34C759;">${T.stable}</div>
                <div class="result-prob">${T.likelihood}: ${data.probability}%</div>
            `;
        }
        resultDiv.style.display = 'block';
    } catch (err) {
        resultDiv.className = 'predict-result high-risk';
        resultDiv.innerHTML = `<div class="result-title" style="color:#FF3B30;">Connection Error</div>`;
        resultDiv.style.display = 'block';
    }
}

// ==========================================
// Modals
// ==========================================
// ==========================================
// Hamburger Menu Toggle
// ==========================================
function toggleHamburger() {
    const panel = document.getElementById('hamburger-panel');
    const overlay = document.getElementById('hamburger-overlay');
    const btn = document.getElementById('hamburger-btn');
    
    const isOpen = panel?.classList.contains('active');
    
    if (isOpen) {
        panel?.classList.remove('active');
        overlay?.classList.remove('active');
        btn?.classList.remove('active');
    } else {
        panel?.classList.add('active');
        overlay?.classList.add('active');
        btn?.classList.add('active');
        // Re-apply role visibility inside panel
        applyRole(window.CURRENT_USER_ROLE);
    }
}

function toggleSidePanel(side) {
    const panel = document.getElementById(`${side}-panel`);
    const btn = document.getElementById(`toggle-${side}`);
    
    if (panel && btn) {
        panel.classList.toggle('collapsed');
        btn.classList.toggle('collapsed');
        
        // Invalidate map size after transition to fix grey areas
        setTimeout(() => {
            if (typeof map !== 'undefined' && map) {
                map.invalidateSize();
            }
        }, 300);
    }
}

// ==========================================
// Accessibility Controls
// ==========================================
function toggleHighContrast(checkbox) {
    if (checkbox.checked) {
        document.body.classList.add('high-contrast');
        showToast('High Contrast Mode Enabled', 'info');
    } else {
        document.body.classList.remove('high-contrast');
        showToast('High Contrast Mode Disabled', 'info');
    }
}

let currentFontSize = 0; // 0 = normal, 1 = large, -1 = small
function changeFontSize(amount) {
    currentFontSize += amount;
    
    // Clamp between -1 and 1
    if (currentFontSize > 1) currentFontSize = 1;
    if (currentFontSize < -1) currentFontSize = -1;
    
    document.body.classList.remove('font-small', 'font-large');
    
    if (currentFontSize === 1) {
        document.body.classList.add('font-large');
        showToast('Text Size Increased', 'info');
    } else if (currentFontSize === -1) {
        document.body.classList.add('font-small');
        showToast('Text Size Decreased', 'info');
    } else {
        showToast('Default Text Size Restored', 'info');
    }
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ==========================================
// Language
// ==========================================
function changeLanguage(langCode) {
    const url = new URL(window.location);
    url.searchParams.set('lang', langCode);
    // Fade out then redirect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { window.location.href = url.toString(); }, 300);
}

function applyTranslations() {
    const T = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const keys = key.split('.');
        let val = T;
        for (const k of keys) { val = val?.[k]; }
        if (val) el.textContent = val;
    });

    // Set language selector
    const langSel = document.getElementById('lang-selector');
    if (langSel) langSel.value = currentLang;

    // Fade in
    document.body.style.opacity = '1';
}

// ==========================================
// Map Layer Toggles
// ==========================================
function toggleLayer(layerName, btn) {
    activeLayers[layerName] = !activeLayers[layerName];
    btn.classList.toggle('active');

    // For simplicity, just toggle marker visibility based on risk level
    markers.forEach(m => {
        if (layerName === 'danger' && m._riskLevel === 'danger') {
            activeLayers[layerName] ? map.addLayer(m) : map.removeLayer(m);
        }
        if (layerName === 'point' && m._riskLevel === 'warning') {
            activeLayers[layerName] ? map.addLayer(m) : map.removeLayer(m);
        }
        if (layerName === 'risk' && m._riskLevel === 'safe') {
            activeLayers[layerName] ? map.addLayer(m) : map.removeLayer(m);
        }
    });
}

// Nav pills — functional filtering
function setActiveNav(btn) {
    document.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');

    const navName = btn.getAttribute('data-nav');
    activeNavFilter = navName;

    // Filter markers based on nav — each pill shows distinct content
    markers.forEach(m => {
        const cat = m._category;    // 'sensor', 'officer', or 'task'
        const rl = m._riskLevel;
        let show = false;

        if (navName === 'safety')      show = (cat === 'sensor');              // all sensor markers
        else if (navName === 'defend') show = (cat === 'sensor' && (rl === 'safe' || rl === 'warning')); // safe/warning sensors
        else if (navName === 'danger') show = (cat === 'sensor' && rl === 'danger');  // danger sensors only
        else if (navName === 'officer') show = (cat === 'officer');            // officer markers only
        else if (navName === 'task')   show = (cat === 'task');                // task markers only

        if (show) { if (!map.hasLayer(m)) map.addLayer(m); }
        else { map.removeLayer(m); }
    });
}

// ==========================================
// Full-Page Views
// ==========================================
function openFullPage(viewId) {
    const overlay = document.getElementById(viewId);
    if (overlay) {
        overlay.classList.add('active');
        // Build charts if needed
        setTimeout(() => {
            if (viewId === 'fp-weekly' && cachedStats) buildFullPageWeeklyChart(cachedStats.weekly_risk);
            if (viewId === 'fp-operations' && cachedStats) buildFullPageOperationChart(cachedStats.operation_tickets);
            if (viewId === 'fp-alarms') buildFullPageAlarmList();
        }, 100);
    }
}

function closeFullPage(viewId) {
    const overlay = document.getElementById(viewId);
    if (overlay) overlay.classList.remove('active');
}

function buildFullPageWeeklyChart(data) {
    const ctx = document.getElementById('fpWeeklyChart');
    if (!ctx) return;
    if (chartInstances.fpWeekly) chartInstances.fpWeekly.destroy();

    const T = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    chartInstances.fpWeekly = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                { label: T.dangers, data: data.danger, backgroundColor: 'rgba(217,45,32,0.7)', borderColor: '#D92D20', borderWidth: 1, borderRadius: 4 },
                { label: 'Delayed', data: data.delayed, backgroundColor: 'rgba(230,138,0,0.7)', borderColor: '#E68A00', borderWidth: 1, borderRadius: 4 },
                { label: T.resolved, data: data.resolved, backgroundColor: 'rgba(18,183,106,0.7)', borderColor: '#12B76A', borderWidth: 1, borderRadius: 4 },
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration: 1200, easing: 'easeOutQuart' },
            plugins: { legend: { display: true, labels: { color: '#5A7A9A', font: { size: 12, family: 'JetBrains Mono' } } } },
            scales: {
                x: { ticks: { color: '#5A7A9A', font: { size: 12 } }, grid: { display: false } },
                y: { ticks: { color: '#5A7A9A', font: { size: 12 } }, grid: { color: 'rgba(0,40,80,0.06)' } },
            }
        }
    });
}

function buildFullPageOperationChart(data) {
    const ctx = document.getElementById('fpOperationChart');
    if (!ctx) return;
    if (chartInstances.fpOps) chartInstances.fpOps.destroy();

    chartInstances.fpOps = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Inspection', data: data.inspection, backgroundColor: 'rgba(0,119,204,0.6)', borderRadius: 4 },
                { label: 'Maintenance', data: data.maintenance, backgroundColor: 'rgba(230,138,0,0.6)', borderRadius: 4 },
                { label: 'Emergency', data: data.emergency, backgroundColor: 'rgba(217,45,32,0.6)', borderRadius: 4 },
                { label: 'Resolved', data: data.resolved, backgroundColor: 'rgba(18,183,106,0.6)', borderRadius: 4 },
            ]
        },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            animation: { duration: 1000 },
            plugins: { legend: { display: true, labels: { color: '#5A7A9A', font: { size: 11, family: 'JetBrains Mono' } } } },
            scales: {
                x: { stacked: true, ticks: { color: '#5A7A9A', font: { size: 11 } }, grid: { color: 'rgba(0,40,80,0.06)' } },
                y: { stacked: true, ticks: { color: '#5A7A9A', font: { size: 11 } }, grid: { display: false } },
            }
        }
    });
}

function buildFullPageAlarmList() {
    const feed = document.getElementById('fp-alarm-feed');
    if (!feed) return;
    // Clone from main feed
    const mainFeed = document.getElementById('alarm-feed');
    if (mainFeed) feed.innerHTML = mainFeed.innerHTML;
}

// ==========================================
// Slider value displays
// ==========================================
function updateSliderValue(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    if (slider && display) display.textContent = slider.value;
}

// ==========================================
// Event Listeners
// ==========================================
function setupEventListeners() {
    // Range slider live updates
    ['pred-ph', 'pred-turbidity', 'pred-nitrate', 'pred-bacteria', 'pred-rainfall', 'pred-temp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                const display = document.getElementById(id + '-val');
                if (display) display.textContent = el.value;
            });
        }
    });
}
// ==========================================
// Draggable Enhanced Marker Panel
// ==========================================
let miChartInstance = null;

function openMarkerInfo(data, stateName) {
    const panel = document.getElementById('marker-info-panel');
    const title = document.getElementById('mi-title');
    const status = document.getElementById('mi-status');
    const wqi = document.getElementById('mi-wqi');
    const time = document.getElementById('mi-time');
    const desc = document.getElementById('mi-desc');

    title.innerHTML = `📍 ${data.city || stateName}`;
    status.innerHTML = data.risk_level.toUpperCase();
    status.className = `mi-val`; // reset
    status.style.color = data.risk_level === 'danger' ? '#FF3B30' : data.risk_level === 'warning' ? '#FF9500' : '#34C759';
    
    // Calculate a mock WQI score out of 100 based on outbreak risk
    const wqiScore = 100 - parseInt(data.outbreak_pct || 0);
    wqi.innerHTML = `${wqiScore}/100`;
    wqi.style.color = status.style.color;

    const now = new Date();
    time.innerHTML = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const calibrated = document.getElementById('mi-calibrated');
    if (calibrated) {
        // Mock calibration date between 1 and 14 days ago
        const calDate = new Date();
        calDate.setDate(calDate.getDate() - Math.floor(Math.random() * 14 + 1));
        calibrated.innerHTML = calDate.toLocaleDateString('en-GB');
    }

    desc.innerHTML = `This sensor node detects <b>${data.avg_temp}°C</b> temp, <b>${data.avg_turbidity} NTU</b> turbidity, and <b>${data.avg_ph} pH</b>. Pathogen detection indicates a <b>${data.outbreak_pct}%</b> outbreak risk.`;

    panel.style.display = 'block';

    // Render Mini Chart
    const ctx = document.getElementById('mi-history-chart').getContext('2d');
    if (miChartInstance) miChartInstance.destroy();

    // Generate some mock history data trending towards current value (30 days)
    const baseTurb = parseFloat(data.avg_turbidity);
    const basePH = parseFloat(data.avg_ph);
    const histTurb = Array.from({length: 29}, (_, i) => baseTurb + (Math.random() * 4 - 2));
    histTurb.push(baseTurb);
    
    const histPH = Array.from({length: 29}, (_, i) => basePH + (Math.random() * 1.5 - 0.75));
    histPH.push(basePH);
    
    const labels30d = Array.from({length: 30}, (_, i) => `D-${30-i}`);
    labels30d[29] = 'Today';

    miChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels30d,
            datasets: [
                {
                    label: 'Turbidity (NTU)',
                    data: histTurb,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    pointRadius: 1,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'pH Level',
                    data: histPH,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    pointRadius: 1,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: true, ticks: { color: '#888', font: {size: 8} }, grid: {display: false} },
                y: { display: true, position: 'right', ticks: { color: '#888', font: {size: 8} }, border: {display:false} }
            }
        }
    });
}

function closeMarkerInfo() {
    document.getElementById('marker-info-panel').style.display = 'none';
}

// Draggable Logic
function makeDraggable(elmnt, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Initialize Draggable Panel and Auth Logic
document.addEventListener('DOMContentLoaded', () => {
    makeDraggable(document.getElementById('marker-info-panel'), document.getElementById('marker-info-header'));
    
    if (window.CURRENT_USER_ROLE) {
        applyRole(window.CURRENT_USER_ROLE);
        showToast(`Authenticated as ${window.CURRENT_USERNAME} (${window.CURRENT_USER_ROLE})`, 'success');
    }
    
    startJwtCountdown();
    
    // Start polling for security anomalies (Tamper Detection)
    if (window.CURRENT_USER_ROLE === 'Admin' || window.CURRENT_USER_ROLE === 'District Officer') {
        setInterval(pollSecurity, 5000);
        pollSecurity();
    }
});

// ==========================================
// Phase 3 & 4: Security Analytics Polling
// ==========================================
let activeTamperSensor = null;

async function pollSecurity() {
    try {
        const res = await fetch('/api/anomalies');
        const data = await res.json();
        
        // Update Security Status Panel Badges
        const tamperBadge = document.getElementById('tamper-badge-count');
        const pillTamper = document.getElementById('pill-tamper');
        
        if (data.tamper_alerts > 0) {
            if (tamperBadge) {
                tamperBadge.style.display = 'inline-block';
                tamperBadge.innerText = data.tamper_alerts;
                tamperBadge.style.background = 'var(--danger-red)';
            }
            if (pillTamper) {
                pillTamper.innerText = `🔴 ${data.tamper_alerts} Tamper Alert${data.tamper_alerts > 1 ? 's' : ''}`;
            }
            
            // Show Banner for latest
            const banner = document.getElementById('tamper-alert-banner');
            if (banner && data.latest.length > 0) {
                const latest = data.latest[0];
                const parts = latest.details.split(' - ');
                activeTamperSensor = parts[0];
                document.getElementById('tamper-alert-text').innerText = latest.details;
                banner.style.display = 'block';
                
                // Change marker to purple lightning on map
                document.querySelectorAll('.leaflet-marker-icon').forEach(icon => {
                    if (icon.innerHTML.includes(activeTamperSensor)) {
                        icon.style.filter = 'hue-rotate(270deg) drop-shadow(0 0 8px #a200ff)';
                    }
                });
            }
        }
        
        // Render Anomalies List
        if (data.active_anomalies) {
            const listEl = document.getElementById('anomaly-list');
            const countPill = document.getElementById('anomaly-count-pill');
            const pillAnomaly = document.getElementById('pill-anomaly');
            
            if (countPill) countPill.innerText = `[${data.active_anomalies.length}]`;
            if (pillAnomaly) pillAnomaly.innerText = `⚠️ ${data.active_anomalies.length} Anomaly`;
            
            if (listEl && data.active_anomalies.length > 0) {
                listEl.innerHTML = data.active_anomalies.map(a => {
                    const color = a.type.includes('Cyber') ? 'var(--danger-red)' : 'var(--warning-amber)';
                    return `
                        <div style="display:flex; justify-content:space-between; margin-bottom:6px; border-left:2px solid ${color}; padding-left:6px; cursor:pointer;"
                             onclick="showDataToast('${a.sensor_id} reported ${a.value} vs expected ${a.expected}')">
                            <span style="font-weight:bold; color:#fff;">${a.sensor_id}</span>
                            <span style="color:${color};">${a.type}</span>
                            <span style="color:var(--text-muted);">${a.confidence}%</span>
                            <span style="color:var(--accent-cyan);">${a.timestamp}</span>
                        </div>
                    `;
                }).join('');
            }
        }
    } catch (e) { console.error('Error polling security', e); }
}

function investigateTamper() {
    if (!activeTamperSensor) return;
    
    // Find coordinates for sensor from NER_LOCATIONS or default
    // We can iterate over city markers
    cityMarkers.forEach(m => {
        if (m.sensorId === activeTamperSensor || m.bindPopup(activeTamperSensor)) {
            map.flyTo(m.getLatLng(), 11, {
                animate: true,
                duration: 1.5
            });
            setTimeout(() => {
                m.fire('click');
            }, 1600);
        }
    });
    
    // Close right panel if on mobile so map is visible
    if (window.innerWidth <= 768) {
        toggleSidePanel('right');
    }
}

function dismissTamper() {
    const banner = document.getElementById('tamper-alert-banner');
    if (banner) banner.style.display = 'none';
    activeTamperSensor = null;
    
    // Reset marker colors
    document.querySelectorAll('.leaflet-marker-icon').forEach(icon => {
        icon.style.filter = '';
    });
}

// ==========================================
// Phase 5: API Security Monitor & DDoS
// ==========================================
async function fetchSecurityStats() {
    try {
        const res = await fetch('/api/security-stats');
        const data = await res.json();
        
        // Update basic counts
        const toInt = id => document.getElementById(id);
        if (toInt('stat-total')) toInt('stat-total').innerText = data.metrics.total;
        if (toInt('stat-inj')) toInt('stat-inj').innerText = data.metrics.blocked_injection;
        if (toInt('stat-auth')) toInt('stat-auth').innerText = data.metrics.blocked_auth;
        if (toInt('stat-limit')) toInt('stat-limit').innerText = data.metrics.blocked_limit;
        if (toInt('stat-clean')) toInt('stat-clean').innerText = data.metrics.clean;
        
        // Update metric grids
        if (toInt('sec-blocked-req')) toInt('sec-blocked-req').innerText = data.metrics.blocked_injection + data.metrics.blocked_limit + data.metrics.blocked_auth;
        
        // Update Last Attack Attempt
        if (data.last_attack && toInt('stat-last-attack')) {
            toInt('stat-last-attack').innerHTML = `
                Last Attack Attempt:<br>
                <span style="color:var(--danger-red); font-weight:bold;">${data.last_attack.type}</span> 
                (${data.last_attack.time}) from ${data.last_attack.ip} at <code>${data.last_attack.route}</code>
            `;
        }
        
        // Update DDoS Traffic load
        if (toInt('ddos-val')) toInt('ddos-val').innerText = `${data.rate_per_min}/100 req/min`;
        if (toInt('ddos-bar')) {
            toInt('ddos-bar').style.width = `${Math.min(data.rate_per_min, 100)}%`;
            toInt('ddos-bar').style.background = data.ddos_active ? 'var(--danger-red)' : '#00ffcc';
        }
        if (toInt('ddos-status')) {
            toInt('ddos-status').innerText = data.ddos_active ? "⚠️ DDoS Attack Detected — Rate Limiting" : "✅ Normal Traffic";
            toInt('ddos-status').style.color = data.ddos_active ? "var(--danger-red)" : "#00ffcc";
        }
        
    } catch (e) { console.error('Error fetching security stats', e); }
}

let wafEnabled = true;

function toggleWAF(checkbox) {
    wafEnabled = checkbox.checked;
    if (wafEnabled) {
        showToast("WAF / Antivirus Protection ENABLED", "success");
        // Remove glitch effects if they were active
        const overlay = document.getElementById('system-failure-overlay');
        if (overlay) overlay.style.display = 'none';
        document.querySelectorAll('.data-glitch').forEach(el => el.classList.remove('data-glitch'));
    } else {
        showToast("⚠️ WAF / Antivirus DISABLED. System is vulnerable.", "warning", 4000);
    }
}

async function simulateDDoS() {
    if (!wafEnabled) {
        showToast("CRITICAL ALERT: INCOMING DDOS STRIKE DETECTED", "error", 4000);
        
        // Disable WAF = Massive System Failure Visualization
        setTimeout(() => {
            const overlay = document.getElementById('system-failure-overlay');
            if (overlay) overlay.style.display = 'block';
            
            // Corrupt UI Data
            document.querySelectorAll('.tile-value, .kpi-value, #stat-total, #stat-limit, #risk-badge-score').forEach(el => {
                el.innerText = 'ERR_0x99';
                el.classList.add('data-glitch');
            });
            
            // Corrupt Map
            document.querySelectorAll('.leaflet-marker-icon, .river-line').forEach(el => {
                el.style.filter = 'hue-rotate(90deg) contrast(200%) invert(100%)';
                el.classList.add('data-glitch');
            });
            
            // Stop any ongoing Live Simulation
            if (liveSimulationTimer) toggleLiveSimulation();
            
        }, 1500);

        return; // Don't even bother hitting the API, the system is "down"
    }

    // Normal WAF Protected DDoS Simulation
    showToast("Launching Simulated DDoS Attack...", "warning", 2000);
    // Rapid fire 60 requests in 1 second to trigger 429
    for (let i = 0; i < 60; i++) {
        fetch('/api/data/current').catch(()=>{});
        if (i % 10 === 0) await new Promise(r => setTimeout(r, 100)); // space out to not freeze browser
    }
    // Poll immediately after simulation
    setTimeout(fetchSecurityStats, 1500);
}

// Ensure fetchSecurityStats is called periodically
document.addEventListener('DOMContentLoaded', () => {
    if (window.CURRENT_USER_ROLE === 'Admin' || window.CURRENT_USER_ROLE === 'District Officer') {
        setInterval(fetchSecurityStats, 5000);
        fetchSecurityStats();
    }
});

// ==========================================
// Phase 6: Immutable Audit Trail & Modals
// ==========================================

async function fetchAuditLog() {
    try {
        const res = await fetch('/api/audit-log');
        const logs = await res.json();
        const tbody = document.getElementById('audit-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = logs.map(l => `
            <tr>
                <td>${l.timestamp}</td>
                <td><span style="color:var(--accent-cyan); font-weight:bold;">${l.username}</span><br><span style="font-size:0.65rem;color:var(--text-muted);">${l.role}</span></td>
                <td><span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; font-size:0.7rem;">${l.action.replace(/_/g, ' ')}</span></td>
                <td>${l.details}</td>
                <td><code style="background:rgba(0,0,0,0.5); padding:3px 5px; border-radius:4px; font-size:0.75rem;">${l.ip_address}</code></td>
                <td style="font-family:monospace; font-size:0.65rem; color:var(--text-muted); word-break:break-all;" title="Hash: ${l.hash}">
                    ${l.hash.substring(0, 24)}...
                </td>
            </tr>
        `).join('');
    } catch(e) { console.error('Failed to fetch audit log', e); }
}

// ==========================================
// JWT Session Countdown Logic
// ==========================================
function startJwtCountdown() {
    function getJwtExp() {
        const exp = localStorage.getItem('jwt_exp');
        if (!exp) return null;
        return parseInt(exp, 10) * 1000;
    }

    const expTime = getJwtExp();
    const timerEl = document.getElementById('jwt-countdown');
    
    if (!expTime) {
        if (timerEl) timerEl.innerText = "No session found";
        return;
    }

    const interval = setInterval(() => {
        const now = Date.now();
        const diff = expTime - now;

        if (diff <= 0) {
            clearInterval(interval);
            if(timerEl) timerEl.innerText = "00:00:00";
            alert("Session expired for security. Please login again.");
            window.location.href = '/login';
            return;
        }

        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (timerEl) {
            timerEl.innerText = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            if (diff < 5 * 60 * 1000) { // < 5 mins
                timerEl.style.color = '#ff4d4f';
            }
        }
    }, 1000);
}

// ==========================================
// Phase 7: Live Simulation Demonstration
// ==========================================
let liveSimulationTimer = null;

function toggleLiveSimulation() {
    const btn = document.getElementById('live-sim-btn');
    if (liveSimulationTimer) {
        clearInterval(liveSimulationTimer);
        liveSimulationTimer = null;
        if (btn) {
            btn.innerHTML = '▶️ Start Live Simulation';
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }
        showToast('Live Data Simulation Stopped', 'info');
    } else {
        liveSimulationTimer = setInterval(triggerLiveSimulationEvent, 4000);
        if (btn) {
            btn.innerHTML = '⏹️ Stop Simulation';
            btn.style.backgroundColor = 'rgba(217, 45, 32, 0.15)';
            btn.style.color = '#ff4d4f';
            btn.style.borderColor = '#ff4d4f';
        }
        showToast('Live Data Simulation Started! Generating events...', 'success', 3000);
        toggleHamburger(); // close panel ONLY when starting
        triggerLiveSimulationEvent(); // fire first one immediately
    }
}

async function triggerLiveSimulationEvent() {
    if (!cachedStats || !cachedStats.state_data) return;

    const statesList = Object.keys(cachedStats.state_data);
    if (statesList.length === 0) return;

    // Pick random location
    const randomState = statesList[Math.floor(Math.random() * statesList.length)];
    const data = cachedStats.state_data[randomState];
    
    // Pick random anomaly type
    const anomalyTypes = ['High Turbidity', 'E.Coli Detected', 'pH Anomaly', 'Chemical Spill', 'Sensor Tamper Detected', 'Chlorine Depletion'];
    const randomType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
    const severity = (randomType === 'E.Coli Detected' || randomType === 'Chemical Spill') ? 'danger' : 'warning';

    // Random local coordinate shift to display multiple markers
    const latOffset = (Math.random() - 0.5) * 0.15;
    const lngOffset = (Math.random() - 0.5) * 0.15;
    const lat = data.lat + latOffset;
    const lng = data.lng + lngOffset;

    // 1. Submit background alarm to API natively so everyone sees it
    try {
        await fetch('/api/alarms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: `${data.city} Region`, type: randomType, severity, notes: 'Auto-generated by Live Simulation Engine' }),
        });
        loadAlarms(); // Automatically refresh feed UI
    } catch(e) {}

    // 2. Add visual Map Marker specifically for this event
    const icon = createLabeledIcon(severity, 'LIVE');
    const m = L.marker([lat, lng], { icon }).addTo(map);
    m.bindPopup(`
        <div class="marker-popup">
            <h4>🔴 LIVE EVENT</h4>
            <div class="popup-row"><span class="label">Type</span><span class="value" style="color:var(--danger-red)">${randomType}</span></div>
            <div class="popup-row"><span class="label">Location</span><span class="value">${data.city} Grid</span></div>
        </div>
    `);
    m.openPopup();
    
    // Auto-remove marker after 15s to keep the simulation map from overflowing
    setTimeout(() => {
        if(map && m) map.removeLayer(m);
    }, 15000);

    // 3. Trigger River Animation dynamically
    animateAffectedRiver(lat, lng);

    // 4. Update core UI numbers
    if (severity === 'danger') {
        cachedStats.dangers++;
        animateCountUp(document.getElementById('fp-tile-dangers'), cachedStats.dangers, 500);
        
        // Update Risk Badge Score dynamically upwards
        const badgeScore = document.getElementById('risk-badge-score');
        if (badgeScore && !isNaN(parseFloat(badgeScore.innerText))) {
            const currentScore = parseFloat(badgeScore.innerText);
            badgeScore.innerText = (currentScore + (Math.random() * 0.5)).toFixed(1);
        }
    } else {
        cachedStats.warnings++;
        animateCountUp(document.getElementById('fp-tile-warnings'), cachedStats.warnings, 500);
    }
    
    cachedStats.contamination_events++;
    animateCountUp(document.getElementById('fp-tile-contamination'), cachedStats.contamination_events, 500);
    
    // 5. Fire toast UI
    showToast(`LIVE DETECT: ${randomType} at ${data.city} Region`, severity === 'danger' ? 'error' : 'warning', 3500);
}

// ==========================================
// Top Navigation Logic
// ==========================================
function setActiveNav(btn) {
    // Update active class
    const links = document.querySelectorAll('.nav-link');
    links.forEach(l => l.classList.remove('active'));
    btn.classList.add('active');
    
    const nav = btn.getAttribute('data-nav');
    
    if (nav === 'safety') {
        // Home
        closeAllFullPages();
        const leftPanel = document.getElementById('left-panel');
        const rightPanel = document.getElementById('right-panel');
        if (leftPanel && leftPanel.classList.contains('collapsed')) toggleSidePanel('left');
        if (rightPanel && rightPanel.classList.contains('collapsed')) toggleSidePanel('right');
    } else if (nav === 'defend') {
        // Alerts
        if (typeof openFullPage === 'function') openFullPage('fp-alarms');
    } else if (nav === 'danger') {
        // Data
        if (typeof openFullPage === 'function') openFullPage('fp-data-overview');
    } else if (nav === 'officer') {
        // Reports
        showToast('Generating comprehensive health report... Downloading shortly.', 'info', 3000);
        setTimeout(downloadReport, 1500);
    } else if (nav === 'task') {
        // Agency
        if (typeof openFullPage === 'function') openFullPage('fp-danger');
    }
}

function closeAllFullPages() {
    const overlays = document.querySelectorAll('.fullpage-overlay');
    overlays.forEach(o => o.classList.remove('active'));
}

function downloadReport() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        showToast('Report generator not loaded.', 'error');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // --- Letterhead Design ---
    // Draw top blue banner
    doc.setFillColor(31, 41, 55); // Navy
    doc.rect(0, 0, 210, 30, 'F');
    
    // Add Report Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255); // White text on navy
    doc.text("AQUAGUARD PUBLIC HEALTH REPORT", 105, 15, { align: "center" });
    
    doc.setFontSize(10);
    doc.text("Official Portal of the Department of Water Resources", 105, 22, { align: "center" });
    
    // --- Official Seal Placeholder ---
    doc.setDrawColor(31, 41, 55);
    doc.setLineWidth(1);
    doc.circle(25, 45, 10, 'S');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(31, 41, 55);
    doc.text("SEAL", 25, 46, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("DEPARTMENT OF WATER RESOURCES", 40, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 48);
    doc.text("Document Ref: AG-PHR-" + Math.floor(Math.random()*10000), 40, 54);
    
    // Draw separator
    doc.setLineWidth(0.5);
    doc.line(20, 60, 190, 60);
    
    // --- Content ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Executive Summary", 20, 75);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("This document contains the automated system snapshot from the AquaGuard", 20, 85);
    doc.text("monitoring network. All sensors are operating within nominal parameters", 20, 92);
    doc.text("except for the designated active alert zones.", 20, 99);
    
    doc.setFont("helvetica", "bold");
    doc.text("Active Metrics:", 20, 115);
    doc.setFont("helvetica", "normal");
    doc.text("- Total Warnings: 625", 25, 125);
    doc.text("- Danger Areas: 120", 25, 132);
    doc.text("- Active Monitoring: 100", 25, 139);

    // --- Signature Block ---
    doc.line(130, 240, 190, 240);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Authorized Signature", 160, 245, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text("Chief Systems Officer, AquaGuard", 160, 250, { align: "center" });
    
    // --- Footer ---
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("OFFICIAL GOVERNMENT RECORD - FOR INTERNAL USE ONLY", 105, 285, { align: "center" });
    
    // Save the PDF
    doc.save("AquaGuard_Health_Report.pdf");
}

function downloadSensorCSV(device, type, currentValue, unit) {
    // Generate a mock CSV log of the last 24 hours for this specific sensor
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Timestamp,Device_ID,Parameter,Reading,Unit,Status\n";
    
    const now = new Date();
    // Generate 12 mock rows (1 every 2 hours)
    for (let i = 12; i >= 0; i--) {
        const rowTime = new Date(now.getTime() - (i * 2 * 60 * 60 * 1000));
        
        // Make older readings normal, and the most recent reading match the current alert value
        let readingVal;
        let rowStatus;
        if (i === 0) {
            readingVal = currentValue;
            rowStatus = "DANGER";
        } else {
            // Normal mock baseline values based on type
            const baseValue = type.includes('pH') ? 7.0 : type.includes('Turbidity') ? 2.0 : type.includes('E. Coli') ? 0 : 5;
            // Add a small random fluctuation
            readingVal = (baseValue + (Math.random() * 2 - 1)).toFixed(2);
            rowStatus = "NORMAL";
        }
        
        const row = `${rowTime.toISOString()},${device},${type},${readingVal},${unit},${rowStatus}`;
        csvContent += row + "\n";
    }
    
    // Create download link and trigger
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const fileName = `${device.replace(/\s+/g, '_')}_24hr_Log.csv`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`Downloaded sensor log for ${device}`, 'info');
}

// ==========================================
// Session Timeout & Tickets
// ==========================================
let sessionTimeout = null;
let sessionWarningTimeout = null;
const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes
const WARNING_BEFORE = 60 * 1000; // 60 seconds

function resetSessionTimer() {
    clearTimeout(sessionTimeout);
    clearTimeout(sessionWarningTimeout);
    
    // Hide modal if open
    const modal = document.getElementById('sessionTimeoutModal');
    if (modal) modal.style.display = 'none';

    sessionWarningTimeout = setTimeout(() => {
        if (modal) {
            modal.style.display = 'flex';
            let countdown = WARNING_BEFORE / 1000;
            const cntEl = document.getElementById('timeout-countdown');
            if (cntEl) cntEl.innerText = countdown;
            
            const interval = setInterval(() => {
                countdown--;
                if(cntEl) cntEl.innerText = countdown;
                if(countdown <= 0) clearInterval(interval);
            }, 1000);
            
            // store interval ID to clear it if stayed
            window.countdownInterval = interval;
        }
    }, SESSION_DURATION - WARNING_BEFORE);

    sessionTimeout = setTimeout(() => {
        window.location.href = '/logout';
    }, SESSION_DURATION);
}

function stayLoggedIn() {
    if (window.countdownInterval) clearInterval(window.countdownInterval);
    resetSessionTimer();
}

// Reset timer on activity
document.addEventListener('mousemove', resetSessionTimer);
document.addEventListener('keypress', resetSessionTimer);
resetSessionTimer(); // init

// Tickets Logic
async function openTicketsModal() {
    openModal('ticketsModal');
    await loadTickets();
    
    // Show check-in button if officer/inspector
    const role = localStorage.getItem('user_role');
    const btn = document.getElementById('btn-checkin');
    if (btn && (role === 'officer' || role === 'inspector')) {
        btn.style.display = 'block';
    }
}

async function loadTickets() {
    try {
        const res = await fetch('/api/tickets');
        const tickets = await res.json();
        const tbody = document.getElementById('tickets-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        
        tickets.forEach(t => {
            const statusColor = t.status === 'Open' ? '#ef4444' : t.status === 'In Progress' ? '#f59e0b' : '#10b981';
            tbody.innerHTML += `
                <tr style="border-bottom: 1px solid #cbd5e1;">
                    <td style="padding:10px;">#${t.id}</td>
                    <td style="padding:10px;">${t.title}</td>
                    <td style="padding:10px; font-weight:bold; color:${statusColor}">${t.status}</td>
                    <td style="padding:10px;">${t.assignee}</td>
                    <td style="padding:10px; color:#64748b; font-size:0.85rem;">${t.created}</td>
                    <td style="padding:10px;">
                        <select onchange="updateTicket(${t.id}, this.value)" style="padding:4px; border-radius:4px;">
                            <option value="">Update...</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </td>
                </tr>
            `;
        });
    } catch(e) {
        console.error("Error loading tickets", e);
    }
}

async function createNewTicket() {
    const title = prompt("Enter ticket title/description:");
    if (!title) return;
    
    try {
        await fetch('/api/tickets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, assignee: localStorage.getItem('username') || 'Self'})
        });
        showToast('Ticket created successfully', 'success');
        loadTickets();
    } catch(e) {}
}

async function updateTicket(id, status) {
    if (!status) return;
    try {
        await fetch(`/api/tickets/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status: status})
        });
        showToast('Ticket updated', 'success');
        loadTickets();
    } catch(e) {}
}

function officerCheckIn() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            showToast(`Checked in at [${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}]`, 'success');
        }, err => {
            showToast('Checked in successfully (Location denied)', 'success');
        });
    } else {
        showToast('Checked in successfully', 'success');
    }
}

// ==========================================
// Dashboard Filters
// ==========================================
function applyDashboardFilters() {
    const period = document.getElementById('filter-period').value;
    const region = document.getElementById('filter-region').value;
    
    // Mock data generators based on selected filters
    let multiplier = 1;
    if (period === '30') multiplier = 4;
    if (period === '365') multiplier = 48;
    
    let regionFactor = 1;
    if (region === 'guwahati') regionFactor = 0.4;
    if (region === 'imphal') regionFactor = 0.2;
    
    const baseWarnings = 625;
    const baseDangers = 120;
    const baseMonitoring = 100;
    const baseContamination = 187;

    const warnings = Math.round(baseWarnings * multiplier * regionFactor);
    const dangers = Math.round(baseDangers * multiplier * regionFactor);
    const monitoring = Math.round(baseMonitoring * multiplier * regionFactor);
    const contamination = Math.round(baseContamination * multiplier * regionFactor);

    // Randomize trend percentages slightly
    const randomTrend = () => Math.floor(Math.random() * 20) + 1;
    const getTrendHTML = (up) => {
        const val = randomTrend();
        return up 
            ? `<div class="change-badge" style="color: #ef4444;">(Up ${val}%)</div>`
            : `<div class="change-badge" style="color: #10b981;">(Down ${val}%)</div>`;
    };

    // Update the DOM elements
    const updateTile = (id, value, isUpTrend) => {
        const tileVal = document.getElementById(id);
        if (tileVal) {
            tileVal.innerText = value.toLocaleString();
            const parent = tileVal.parentElement;
            let badge = parent.querySelector('.change-badge');
            if (badge) {
                badge.outerHTML = getTrendHTML(isUpTrend);
            }
        }
    };

    updateTile('tile-warnings', warnings, true);
    updateTile('tile-dangers', dangers, false);
    updateTile('tile-monitoring', monitoring, true);
    updateTile('tile-contamination', contamination, true);

    showToast('Dashboard data updated based on filters', 'success');
}
