export interface AdvisoryReportData {
  header: {
    farmName: string;
    locationStr: string; // e.g. "Gandhinagar, Gujarat — 382355"
    coordinates: string; // e.g. "23.22°N, 72.70°E"
    issuedDate: string;  // e.g. "Wed, 5 Aug 2026"
    outlookPeriod: string; // e.g. "16-day outlook · Kharif season"
    crop: string;        // e.g. "COTTON"
  };
  whatToDoToday: Array<{
    icon: "drainage" | "irrigation" | "scout" | "remove" | string;
    title: string;
    description: string;
  }>;
  aiOverview: {
    weatherSummary: string;
    soilSummary: string;
    riskSummary: string;
    outlookBadge: "FAVORABLE" | "CAUTIONARY" | "UNFAVORABLE";
  };
  cropCalendar: {
    season: string;      // e.g. "KHARIF"
    cropName: string;    // e.g. "COTTON"
    currentStage: string;// e.g. "Flowering stage"
    activeStageType: "sow" | "growing" | "harvest";
  };
  weatherRisks: Array<{
    type: "heat" | "wind" | "lightning" | "rain" | "frost";
    title: string;
    level: "LOW" | "MODERATE" | "HIGH" | "MINIMAL" | "NONE";
    levelColor?: string;
    description: string;
  }>;
  farmRisk: {
    overallLevel: "LOW" | "MEDIUM" | "HIGH" | "SEVERE";
    contextText: string;
    actions: Array<{
      icon: "drainage" | "scout" | "remove" | string;
      title: string;
      description: string;
    }>;
    irrigationNote: string;
    soilTransition: {
      fromState: string; // "Moderate Wet"
      toState: string;   // "Abnormally Wet"
      trendSummary: string;
    };
  };
  forecast16Day: Array<{
    dateStr: string; // "25 AUG"
    dayName: string; // "Mon"
    tmax: number;
    tmin: number;
    pcp: number;
  }>;
  forecastSummaryFooter: string;
}

export function generateAdvisoryHtml(data: AdvisoryReportData): string {
  const getRiskColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
      case "SEVERE":
        return "#dc2626";
      case "MODERATE":
      case "MEDIUM":
      case "CAUTIONARY":
        return "#d97706";
      case "LOW":
        return "#2563eb";
      case "MINIMAL":
        return "#059669";
      default:
        return "#6b7280";
    }
  };

  const getRiskBg = (level: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
      case "SEVERE":
        return "#fef2f2";
      case "MODERATE":
      case "MEDIUM":
      case "CAUTIONARY":
        return "#fffbeb";
      case "LOW":
        return "#eff6ff";
      case "MINIMAL":
        return "#ecfdf5";
      default:
        return "#f3f4f6";
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "drainage":
        return `<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#e0f2fe;color:#0284c7;font-size:13px;">💧</span>`;
      case "irrigation":
        return `<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:13px;">💦</span>`;
      case "scout":
        return `<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#fef3c7;color:#d97706;font-size:13px;">👁</span>`;
      case "remove":
        return `<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#fee2e2;color:#dc2626;font-size:13px;">🗑</span>`;
      case "heat":
        return `<span style="font-size:22px;color:#ea580c;">♨</span>`;
      case "wind":
        return `<span style="font-size:22px;color:#0284c7;">💨</span>`;
      case "lightning":
        return `<span style="font-size:22px;color:#eab308;">⚡</span>`;
      case "rain":
        return `<span style="font-size:22px;color:#2563eb;">🌧</span>`;
      case "frost":
        return `<span style="font-size:22px;color:#06b6d4;">❄</span>`;
      default:
        return `<span style="font-size:14px;">🌱</span>`;
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FarmRisk Advisory - ${data.header.crop}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    .sheet {
      width: 794px; /* Standard A4 width at 96 DPI */
      min-height: 1123px;
      background: #ffffff;
      padding: 28px 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* HEADER */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 14px;
      margin-bottom: 16px;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #0f172a;
    }
    .brand-sub {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .farm-location {
      font-size: 11px;
      font-weight: 600;
      color: #334155;
      margin-top: 6px;
    }
    .header-right {
      text-align: right;
    }
    .issued-date {
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
    }
    .outlook-season {
      font-size: 10px;
      color: #64748b;
      margin-top: 2px;
    }
    .crop-pill {
      display: inline-block;
      margin-top: 6px;
      background: #065f46;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      padding: 3px 12px;
      border-radius: 4px;
    }

    /* SECTION TITLE */
    .section-title {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #334155;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }

    /* GRID LAYOUTS */
    .top-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 16px;
      margin-bottom: 14px;
    }
    .panel {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
    }

    /* WHAT TO DO TODAY */
    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .todo-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .todo-item-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }
    .todo-item-desc {
      font-size: 10px;
      color: #64748b;
      line-height: 1.35;
      margin-top: 2px;
    }

    /* AI OVERVIEW */
    .ai-body {
      font-size: 10.5px;
      color: #334155;
      line-height: 1.45;
    }
    .ai-body p {
      margin-bottom: 6px;
    }
    .highlight-stat {
      font-weight: 700;
      color: #0f172a;
    }
    .outlook-tag {
      font-weight: 800;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
    }

    /* CROP CALENDAR WIDGET */
    .calendar-widget {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px dashed #e2e8f0;
    }
    .calendar-header {
      font-size: 9.5px;
      font-weight: 700;
      color: #475569;
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .calendar-bar {
      display: flex;
      height: 18px;
      border-radius: 3px;
      overflow: hidden;
      font-size: 8px;
      font-weight: 700;
      text-align: center;
      line-height: 18px;
      color: #ffffff;
      margin-bottom: 3px;
    }
    .months-row {
      display: flex;
      justify-content: space-between;
      font-size: 7.5px;
      font-weight: 600;
      color: #94a3b8;
      padding: 0 4px;
    }

    /* WEATHER RISK CARDS */
    .weather-risk-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    .weather-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .weather-card-title {
      font-size: 11px;
      font-weight: 700;
      color: #1e293b;
      margin-top: 4px;
    }
    .weather-card-badge {
      font-size: 9px;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 3px;
      margin: 4px 0;
      letter-spacing: 0.3px;
    }
    .weather-card-desc {
      font-size: 9px;
      color: #64748b;
      line-height: 1.25;
    }

    /* FARM RISK SECTION */
    .farm-risk-panel {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 14px;
    }
    .farm-risk-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .farm-risk-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 8px;
    }
    .farm-risk-text {
      font-size: 10.5px;
      color: #334155;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    .soil-chart-box {
      border-left: 1px solid #e2e8f0;
      padding-left: 16px;
    }
    .chart-banner {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 10px;
      color: #0369a1;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .chart-transition {
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .soil-sparkline-svg {
      width: 100%;
      height: 48px;
    }

    /* 16-DAY FORECAST */
    .forecast-panel {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .forecast-row {
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      gap: 3px;
      margin-top: 6px;
    }
    .forecast-col {
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 4px 1px;
      text-align: center;
      background: #ffffff;
    }
    .forecast-col.rainy {
      background: #eff6ff;
      border-color: #bfdbfe;
    }
    .forecast-date {
      font-size: 8px;
      font-weight: 800;
      color: #475569;
      line-height: 1.1;
    }
    .forecast-day {
      font-size: 7.5px;
      color: #94a3b8;
      margin-bottom: 4px;
    }
    .forecast-high {
      font-size: 10px;
      font-weight: 800;
      color: #0f172a;
    }
    .forecast-low {
      font-size: 8px;
      color: #64748b;
    }
    .forecast-rain {
      font-size: 8px;
      font-weight: 700;
      color: #2563eb;
      margin-top: 3px;
    }
    .forecast-summary-note {
      font-size: 9px;
      color: #64748b;
      margin-top: 6px;
      text-align: center;
    }

    /* FOOTER */
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 8.5px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div>
      <!-- HEADER -->
      <div class="header">
        <div>
          <div class="brand-group">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <path d="M16 4C9 4 5 9 5 16c0 6 4 11 11 12 0-9 3-14 10-17-3-4-7-7-10-7Z" fill="#10b981"/>
              <path d="M16 28C11 20 12 12 16 6" stroke="#064e3b" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
            <div>
              <div class="brand-title">FARMRISK ADVISORY</div>
              <div class="brand-sub">CLIMATE INTELLIGENCE & FIELD ACTION REPORT</div>
            </div>
          </div>
          <div class="farm-location">${data.header.farmName}, ${data.header.locationStr} &nbsp;·&nbsp; ${data.header.coordinates}</div>
        </div>
        <div class="header-right">
          <div class="issued-date">ISSUED ${data.header.issuedDate}</div>
          <div class="outlook-season">${data.header.outlookPeriod}</div>
          <div class="crop-pill">CROP: ${data.header.crop}</div>
        </div>
      </div>

      <!-- TOP 2-COL SECTION -->
      <div class="top-grid">
        <!-- WHAT TO DO TODAY -->
        <div class="panel">
          <div class="section-title">✅ WHAT TO DO TODAY</div>
          <div class="todo-list">
            ${data.whatToDoToday.map(item => `
              <div class="todo-item">
                <div>${renderIcon(item.icon)}</div>
                <div>
                  <div class="todo-item-title">${item.title}</div>
                  <div class="todo-item-desc">${item.description}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- AI OVERVIEW -->
        <div class="panel">
          <div class="section-title">🤖 AI OVERVIEW — 16-DAY OUTLOOK</div>
          <div class="ai-body">
            <p>${data.aiOverview.weatherSummary}</p>
            <p>${data.aiOverview.soilSummary}</p>
            <p>
              ${data.aiOverview.riskSummary} &nbsp;
              Overall outlook: 
              <span class="outlook-tag" style="background:${getRiskBg(data.aiOverview.outlookBadge)};color:${getRiskColor(data.aiOverview.outlookBadge)};">
                ${data.aiOverview.outlookBadge}
              </span>
            </p>
          </div>

          <!-- CROP CALENDAR WIDGET -->
          <div class="calendar-widget">
            <div class="calendar-header">
              <span>📅 ${data.cropCalendar.season} CROP CALENDAR · ${data.cropCalendar.cropName}</span>
              <span>now at <b>${data.cropCalendar.currentStage}</b></span>
            </div>
            <div class="calendar-bar">
              <div style="width: 25%; background: #94a3b8;">JAN–APR</div>
              <div style="width: 12%; background: #059669;">SOW</div>
              <div style="width: 28%; background: #d97706;">GROWING</div>
              <div style="width: 20%; background: #dc2626;">HARVEST</div>
              <div style="width: 15%; background: #94a3b8;">NOV–DEC</div>
            </div>
            <div class="months-row">
              <span>J</span><span>F</span><span>M</span><span>A</span><span>M</span><span>J</span><span>J</span><span>A</span><span>S</span><span>O</span><span>N</span><span>D</span>
            </div>
          </div>
        </div>
      </div>

      <!-- WEATHER RISKS -->
      <div>
        <div class="section-title">⚠ WEATHER RISK</div>
        <div class="weather-risk-grid">
          ${data.weatherRisks.map(risk => `
            <div class="weather-card">
              ${renderIcon(risk.type)}
              <div class="weather-card-title">${risk.title}</div>
              <div class="weather-card-badge" style="background:${getRiskBg(risk.level)};color:${getRiskColor(risk.level)};">
                ${risk.level}
              </div>
              <div class="weather-card-desc">${risk.description}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- FARM RISK - PEST, DISEASE & SOIL -->
      <div class="farm-risk-panel">
        <div class="farm-risk-header">
          <div class="section-title" style="margin-bottom:0;">☣ FARM RISK — PEST, DISEASE & SOIL</div>
          <span class="outlook-tag" style="background:${getRiskBg(data.farmRisk.overallLevel)};color:${getRiskColor(data.farmRisk.overallLevel)};">
            ${data.farmRisk.overallLevel}
          </span>
        </div>
        <div class="farm-risk-grid">
          <div>
            <div class="farm-risk-text">${data.farmRisk.contextText}</div>
            <div class="todo-list">
              ${data.farmRisk.actions.map(action => `
                <div class="todo-item">
                  <div>${renderIcon(action.icon)}</div>
                  <div>
                    <div class="todo-item-title">${action.title}</div>
                    <div class="todo-item-desc">${action.description}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="soil-chart-box">
            <div class="chart-banner">💧 ${data.farmRisk.irrigationNote}</div>
            <div class="chart-transition">${data.farmRisk.soilTransition.fromState} → ${data.farmRisk.soilTransition.toState}</div>
            <!-- Minimal SVG Chart for Soil Moisture Profile -->
            <svg class="soil-sparkline-svg" viewBox="0 0 300 60">
              <rect x="0" y="0" width="300" height="20" fill="#eff6ff" opacity="0.5"/>
              <rect x="0" y="20" width="300" height="20" fill="#f0fdf4" opacity="0.5"/>
              <rect x="0" y="40" width="300" height="20" fill="#fffbeb" opacity="0.5"/>
              <text x="5" y="14" font-size="7" fill="#64748b" font-weight="700">ABN. WET</text>
              <text x="5" y="34" font-size="7" fill="#64748b" font-weight="700">MOD. WET</text>
              <text x="5" y="54" font-size="7" fill="#64748b" font-weight="700">NORMAL</text>
              <path d="M 10 32 Q 100 30 180 20 T 290 8" fill="none" stroke="#2563eb" stroke-width="2.5"/>
              <circle cx="10" cy="32" r="3" fill="#2563eb"/>
              <circle cx="210" cy="17" r="3.5" fill="#0284c7"/>
              <text x="200" y="10" font-size="7.5" fill="#0284c7" font-weight="800">☂ 13.5mm</text>
            </svg>
            <div class="todo-item-desc" style="margin-top:6px;">${data.farmRisk.soilTransition.trendSummary}</div>
          </div>
        </div>
      </div>

      <!-- 16-DAY FORECAST -->
      <div class="forecast-panel">
        <div class="section-title" style="margin-bottom:0;">📈 16-DAY FORECAST — HIGH/LOW °C & RAIN (MM)</div>
        <div class="forecast-row">
          ${data.forecast16Day.map(day => `
            <div class="forecast-col ${day.pcp >= 1 ? "rainy" : ""}">
              <div class="forecast-date">${day.dateStr}</div>
              <div class="forecast-day">${day.dayName}</div>
              <div class="forecast-high">${Math.round(day.tmax)}°</div>
              <div class="forecast-low">${Math.round(day.tmin)}°</div>
              <div class="forecast-rain">${day.pcp > 0 ? day.pcp.toFixed(1) : "·"}</div>
            </div>
          `).join("")}
        </div>
        <div class="forecast-summary-note">
          ${data.forecastSummaryFooter}
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div>© 2026 FarmRisk Corporation · Advisory only — not for regulatory submission</div>
      <div>Verified against satellite hydrology & bias corrections · Confirm with local agri-extension officer</div>
    </div>
  </div>
</body>
</html>`;
}
