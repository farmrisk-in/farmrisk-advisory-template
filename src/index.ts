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

// ── HUGEICONS SVG DICTIONARY (STROKE-BASED, 24x24 VIEWBOX) ───────────────────
const HUGE_ICONS: Record<string, string> = {
  // Brand / Nature
  plant: `<path d="M18 10C18 10 12 14 12 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M9.34882 11.1825C7.73784 12.3891 5.44323 12.26 3.9785 10.7953C1.55484 8.37164 2.03957 3.03957 2.03957 3.03957C2.03957 3.03957 7.37164 2.55484 9.7953 4.9785C10.7548 5.93803 11.1412 7.25369 10.9543 8.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M14.9638 12.8175C13.644 11.3832 13.6797 9.14983 15.0708 7.75867C17.2252 5.6043 21.9648 6.03517 21.9648 6.03517C21.9648 6.03517 22.3957 10.7748 20.2413 12.9292C19.4877 13.6828 18.487 14.0386 17.5 13.9967" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M6 7C6 7 12 12 12 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />`,
  // Section Headers
  checkList: `<path d="M11 6L21 6" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M11 12L21 12" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M11 18L21 18" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />`,
  bot: `<path d="M17 13V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V13C7 14.8692 7 15.8038 7.40192 16.5C7.66523 16.9561 8.04394 17.3348 8.5 17.5981C9.19615 18 10.1308 18 12 18C13.8692 18 14.8038 18 15.5 17.5981C15.9561 17.3348 16.3348 16.9561 16.5981 16.5C17 15.8038 17 14.8692 17 13Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" /><path d="M18 21C18 19.8954 18.8954 19 20 19C21.1046 19 22 19.8954 22 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M2 21C2 19.8954 2.89543 19 4 19C5.10457 19 6 19.8954 6 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M10.125 7.25H10M10.25 7.25C10.25 7.38807 10.1381 7.5 10 7.5C9.86193 7.5 9.75 7.38807 9.75 7.25C9.75 7.11193 9.86193 7 10 7C10.1381 7 10.25 7.11193 10.25 7.25Z" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M14.125 7.25H14M14.25 7.25C14.25 7.38807 14.1381 7.5 14 7.5C13.8619 7.5 13.75 7.38807 13.75 7.25C13.75 7.11193 13.8619 7 14 7C14.1381 7 14.25 7.11193 14.25 7.25Z" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />`,
  calendar: `<path d="M16 2V6M8 2V6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M3 10H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />`,
  alert: `<path d="M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M12 9V13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />`,
  bug: `<path d="M3.01309 4.99084C2.89323 6.05084 3.55249 8.42285 6.48923 8.42285" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M17.5951 8.38081C18.8357 8.57881 21.1132 7.49881 20.9957 5.00281" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M20.9928 20.9989C21.0528 19.9429 20.1777 17.5549 17.599 17.4229" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M6.45163 17.4708C5.65013 17.2308 3.01306 18.3348 3.01306 20.9988" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M9.3299 6.11884C9.35388 5.09884 9.84533 2.99884 12.0029 2.99884C13.9208 2.99884 14.5861 4.61884 14.676 6.11884M6.26131 9.41884C6.38118 8.63884 7.29216 6.81484 9.36586 6.63484C11.4635 6.55564 14.3403 6.58684 14.8797 6.67084C15.5869 6.73377 17.2951 7.43884 17.7506 9.41884C17.9124 10.4388 17.8285 11.8788 17.8524 12.7188C17.8165 13.5588 17.9207 15.2623 17.7565 16.1388C17.6367 17.0988 16.9894 18.4668 16.1024 19.3068C14.7838 20.7228 11.1639 22.2108 8.03534 19.4508C6.41713 17.8908 6.30925 16.3788 6.18939 15.7788C6.15725 15.4571 6.15875 13.8763 6.16541 12.3588C6.14144 11.046 6.17235 9.78063 6.26131 9.41884Z" stroke="currentColor" stroke-width="1.5" /><path d="M3.01306 12.8988H5.9498" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M20.9929 12.8988L18.1161 12.8988" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />`,
  chart: `<path d="M21 21H3V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M7 14L11 9L15 13L21 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />`,
  // Actions
  drainage: `<path d="M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z" stroke="currentColor" stroke-width="1.5" />`,
  irrigation: `<path d="M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z" stroke="currentColor" stroke-width="1.5" /><path d="M12 17V19" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />`,
  scout: `<path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" /><path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />`,
  remove: `<path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />`,
  // Weather
  heat: `<path d="M16.5001 22C18.7092 22 20.5001 20.2091 20.5001 18C20.5001 16.9335 20.0827 15.9646 19.4024 15.2475C18.8957 14.7134 18.6424 14.4463 18.5712 14.2679C18.5001 14.0895 18.5001 13.8535 18.5001 13.3815V4C18.5001 2.89543 17.6046 2 16.5001 2C15.3955 2 14.5001 2.89543 14.5001 4V13.3815C14.5001 13.8535 14.5001 14.0895 14.4289 14.2679C14.3577 14.4463 14.1044 14.7134 13.5977 15.2475C12.9174 15.9646 12.5001 16.9335 12.5001 18C12.5001 20.2091 14.2909 22 16.5001 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M10.3133 15.8303C8.67792 15.5416 7.36329 14.104 7.20333 12.2607C7.01373 10.076 8.51806 8.14861 10.5634 7.95588C10.883 7.92576 11.197 7.9398 11.5 7.99327M10.2201 4L10.323 5.18677M6.04201 7.57572L5.18359 6.81058M4.611 12.505L3.5 12.6097M6.86776 17.0868L6.15499 18" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />`,
  wind: `<path d="M21 5.63247C19.8635 4.81397 18.4095 4.81397 17.273 5.63247C16.5877 6.13474 15.6685 6.11614 14.9833 5.61388C13.8468 4.79537 12.3928 4.79537 11.273 5.61388C10.571 6.11614 9.68524 6.11614 9 5.61388" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M3 9.37672C4.16839 10.1953 5.66323 10.1953 6.83162 9.37672C7.53608 8.87443 8.46392 8.87443 9.16838 9.37672C10.3368 10.1953 11.8488 10.2139 13 9.39531" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M21 14.6233C19.8635 13.8047 18.4095 13.8047 17.273 14.6233C16.5877 15.1256 15.6852 15.1256 15 14.6233C13.8635 13.8047 12.3928 13.7861 11.273 14.6047C10.571 15.107 9.68524 15.107 9 14.6047" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" /><path d="M3 18.3767C4.16839 19.1953 5.66323 19.1953 6.83162 18.3767C7.53608 17.8744 8.46392 17.8744 9.16838 18.3767C10.3368 19.1953 11.8488 19.2139 13 18.3953" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />`,
  lightning: `<path d="M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />`,
  rain: `<path d="M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z" stroke="currentColor" stroke-width="1.5" />`,
  frost: `<path d="M21 14.25L20.1689 13.591C19.223 12.841 18.75 12.466 18.75 12C18.75 11.534 19.223 11.159 20.1689 10.409L21 9.75M3 9.75L3.83115 10.409C4.77705 11.159 5.25 11.534 5.25 12C5.25 12.466 4.77705 12.841 3.83115 13.591L3 14.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M14.5718 21L14.7282 19.9412C14.9062 18.7362 14.9951 18.1337 15.4019 17.8986C15.8087 17.6635 16.3744 17.8876 17.5058 18.3358L18.5 18.7296M9.4282 3L9.27182 4.0588C9.09384 5.26379 9.00486 5.86629 8.59808 6.10139C8.1913 6.3365 7.62558 6.1124 6.49416 5.6642L5.5 5.27038" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M5 18.7317L6.07032 18.3375C7.2884 17.8889 7.89747 17.6645 8.33521 17.8994C8.77295 18.1343 8.86844 18.7367 9.05941 19.9414L9.22722 21M19 5.26825L17.9297 5.66249C16.7116 6.11115 16.1025 6.33548 15.6648 6.1006C15.2271 5.86571 15.1316 5.26333 14.9406 4.05859L14.7728 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /><path d="M19 12.0003H5M15.5 17.9998L8.5 6M15.5 6.00025L8.5 18" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" />`,
};

function renderSvgIcon(name: string, size: number = 18, color: string = "currentColor"): string {
  const content = HUGE_ICONS[name] || HUGE_ICONS.plant;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" style="color:${color};flex-shrink:0;vertical-align:middle;">${content}</svg>`;
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
        return "#64748b";
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
        return "#f8fafc";
    }
  };

  const getRiskBorder = (level: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
      case "SEVERE":
        return "#fecaca";
      case "MODERATE":
      case "MEDIUM":
      case "CAUTIONARY":
        return "#fde68a";
      case "LOW":
        return "#bfdbfe";
      case "MINIMAL":
        return "#a7f3d0";
      default:
        return "#e2e8f0";
    }
  };

  const renderActionBadge = (type: string) => {
    let bg = "#f1f5f9";
    let color = "#475569";
    let border = "#e2e8f0";

    switch (type) {
      case "drainage":
      case "irrigation":
        bg = "#e0f2fe";
        color = "#0284c7";
        border = "#bae6fd";
        break;
      case "scout":
        bg = "#fef3c7";
        color = "#d97706";
        border = "#fde68a";
        break;
      case "remove":
        bg = "#fee2e2";
        color = "#dc2626";
        border = "#fecaca";
        break;
    }

    return `<div class="action-icon-bubble" style="background:${bg};border-color:${border};color:${color};">
      ${renderSvgIcon(type, 15, color)}
    </div>`;
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
      background-color: #f1f5f9;
      color: #0f172a;
      display: flex;
      justify-content: center;
      padding: 24px;
    }
    .sheet {
      width: 794px; /* Standard A4 width at 96 DPI */
      min-height: 1123px;
      background: #ffffff;
      padding: 26px 30px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* ── HEADER ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 14px;
      margin-bottom: 14px;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-logo-wrap {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: #ecfdf5;
      border: 1.5px solid #a7f3d0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #064e3b;
      line-height: 1.1;
    }
    .brand-sub {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.8px;
      color: #059669;
      text-transform: uppercase;
      margin-top: 3px;
    }
    .farm-location {
      font-size: 10.5px;
      font-weight: 600;
      color: #334155;
      margin-top: 5px;
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
      font-weight: 500;
      color: #64748b;
      margin-top: 2px;
    }
    .crop-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-top: 6px;
      background: #065f46;
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      padding: 4px 12px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(6, 95, 70, 0.2);
    }

    /* ── UNIFIED SECTION HEADERS (CONSISTENT OUTSIDE/CARD DESIGN) ── */
    .section-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #334155;
      margin-bottom: 8px;
    }
    .section-header .icon-wrap {
      display: flex;
      align-items: center;
      color: #059669;
    }
    .section-header-inline {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    /* ── CARD SURFACES (STANDARDIZED BORDER, PADDING, RADIUS) ── */
    .card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      padding: 13px 15px;
    }

    /* ── TOP 2-COLUMN GRID ── */
    .top-grid {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }

    /* ── WHAT TO DO TODAY ITEMS ── */
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
    .action-icon-bubble {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      border-width: 1px;
      border-style: solid;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .todo-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }
    .todo-desc {
      font-size: 10px;
      font-weight: 400;
      color: #64748b;
      line-height: 1.35;
      margin-top: 2px;
    }

    /* ── AI OVERVIEW CONTENT ── */
    .ai-body {
      font-size: 10.5px;
      color: #334155;
      line-height: 1.45;
    }
    .ai-body p {
      margin-bottom: 6px;
    }
    .ai-body b {
      color: #0f172a;
      font-weight: 700;
    }
    .risk-badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.5px;
      padding: 2px 8px;
      border-radius: 5px;
      border: 1px solid transparent;
      vertical-align: baseline;
    }

    /* ── CROP CALENDAR ── */
    .calendar-container {
      margin-top: 10px;
      padding-top: 9px;
      border-top: 1px solid #f1f5f9;
    }
    .calendar-title-row {
      display: flex;
      justify-content: space-between;
      font-size: 9.5px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 5px;
    }
    .calendar-title-row b {
      color: #065f46;
    }
    .calendar-bar {
      display: flex;
      height: 18px;
      border-radius: 5px;
      overflow: hidden;
      font-size: 8px;
      font-weight: 800;
      text-align: center;
      line-height: 18px;
      color: #ffffff;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    }
    .month-indicators {
      display: flex;
      justify-content: space-between;
      font-size: 8px;
      font-weight: 700;
      color: #94a3b8;
      padding: 3px 5px 0;
    }

    /* ── WEATHER RISKS (5-COLUMN EQUAL CARDS) ── */
    .weather-risk-section {
      margin-bottom: 14px;
    }
    .weather-risk-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
    }
    .weather-card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      padding: 12px 9px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      transition: all 0.2s ease;
    }
    .weather-icon-bubble {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 6px;
    }
    .weather-title {
      font-size: 11px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .weather-badge {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.5px;
      padding: 2px 7px;
      border-radius: 5px;
      border: 1px solid transparent;
      margin-bottom: 6px;
    }
    .weather-desc {
      font-size: 9px;
      color: #64748b;
      line-height: 1.3;
    }

    /* ── FARM RISK: PEST, DISEASE & SOIL ── */
    .farm-risk-section {
      margin-bottom: 14px;
    }
    .farm-risk-grid {
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 18px;
    }
    .farm-risk-context {
      font-size: 10.5px;
      color: #334155;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    .soil-panel {
      border-left: 1.5px solid #f1f5f9;
      padding-left: 18px;
    }
    .irrigation-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      padding: 7px 11px;
      font-size: 10px;
      font-weight: 600;
      color: #0369a1;
      margin-bottom: 8px;
      line-height: 1.35;
    }
    .transition-title {
      font-size: 11px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .soil-chart-svg {
      width: 100%;
      height: 96px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #ffffff;
      margin-bottom: 6px;
    }

    /* ── 16-DAY FORECAST GRID ── */
    .forecast-section {
      margin-bottom: 12px;
    }
    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      gap: 3.5px;
      margin-top: 6px;
    }
    .forecast-col {
      border: 1.5px solid #e2e8f0;
      border-radius: 7px;
      padding: 5px 1px;
      text-align: center;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .forecast-col.rainy {
      background: #eff6ff;
      border-color: #93c5fd;
    }
    .forecast-date {
      font-size: 7.5px;
      font-weight: 800;
      color: #334155;
      line-height: 1.1;
    }
    .forecast-day {
      font-size: 7px;
      font-weight: 600;
      color: #94a3b8;
      margin-bottom: 3px;
    }
    .forecast-high {
      font-size: 10px;
      font-weight: 800;
      color: #0f172a;
    }
    .forecast-low {
      font-size: 8px;
      font-weight: 600;
      color: #64748b;
    }
    .forecast-rain {
      font-size: 8px;
      font-weight: 800;
      color: #2563eb;
      margin-top: 3px;
    }
    .forecast-footer-note {
      font-size: 9px;
      color: #64748b;
      margin-top: 7px;
      text-align: center;
      font-weight: 500;
    }

    /* ── FOOTER ── */
    .footer {
      border-top: 1.5px solid #e2e8f0;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 8.5px;
      font-weight: 500;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div>
      <!-- ── TOP HEADER ── -->
      <div class="header">
        <div>
          <div class="brand-group">
            <div class="brand-logo-wrap">
              ${renderSvgIcon("plant", 22, "#059669")}
            </div>
            <div>
              <div class="brand-title">FARMRISK ADVISORY</div>
              <div class="brand-sub">CLIMATE INTELLIGENCE &amp; FIELD ACTION REPORT</div>
            </div>
          </div>
          <div class="farm-location">${data.header.farmName}, ${data.header.locationStr} &nbsp;·&nbsp; ${data.header.coordinates}</div>
        </div>
        <div class="header-right">
          <div class="issued-date">ISSUED ${data.header.issuedDate}</div>
          <div class="outlook-season">${data.header.outlookPeriod}</div>
          <div class="crop-badge">
            ${renderSvgIcon("plant", 12, "#ffffff")}
            CROP: ${data.header.crop}
          </div>
        </div>
      </div>

      <!-- ── SECTION: 2-COLUMN OVERVIEW & TASKS ── -->
      <div class="top-grid">
        <!-- 1. WHAT TO DO TODAY -->
        <div>
          <div class="section-header">
            <span class="icon-wrap">${renderSvgIcon("checkList", 16, "#059669")}</span>
            WHAT TO DO TODAY
          </div>
          <div class="card">
            <div class="todo-list">
              ${data.whatToDoToday.map(item => `
                <div class="todo-item">
                  ${renderActionBadge(item.icon)}
                  <div style="flex:1;">
                    <div class="todo-title">${item.title}</div>
                    <div class="todo-desc">${item.description}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- 2. AI OVERVIEW -->
        <div>
          <div class="section-header">
            <span class="icon-wrap">${renderSvgIcon("bot", 16, "#059669")}</span>
            AI OVERVIEW — 16-DAY OUTLOOK
          </div>
          <div class="card">
            <div class="ai-body">
              <p>${data.aiOverview.weatherSummary}</p>
              <p>${data.aiOverview.soilSummary}</p>
              <p>
                ${data.aiOverview.riskSummary} &nbsp;
                Overall outlook: 
                <span class="risk-badge" style="background:${getRiskBg(data.aiOverview.outlookBadge)};color:${getRiskColor(data.aiOverview.outlookBadge)};border-color:${getRiskBorder(data.aiOverview.outlookBadge)};">
                  ${data.aiOverview.outlookBadge}
                </span>
              </p>
            </div>

            <!-- Crop Calendar -->
            <div class="calendar-container">
              <div class="calendar-title-row">
                <span style="display:flex;align-items:center;gap:4px;">
                  ${renderSvgIcon("calendar", 12, "#475569")}
                  ${data.cropCalendar.season} CROP CALENDAR · ${data.cropCalendar.cropName}
                </span>
                <span>now at <b>${data.cropCalendar.currentStage}</b></span>
              </div>
              <div class="calendar-bar">
                <div style="width: 25%; background: #94a3b8;">JAN–APR</div>
                <div style="width: 12%; background: #059669;">SOW</div>
                <div style="width: 28%; background: #d97706;">GROWING</div>
                <div style="width: 20%; background: #dc2626;">HARVEST</div>
                <div style="width: 15%; background: #94a3b8;">NOV–DEC</div>
              </div>
              <div class="month-indicators">
                <span>J</span><span>F</span><span>M</span><span>A</span><span>M</span><span>J</span><span>J</span><span>A</span><span>S</span><span>O</span><span>N</span><span>D</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SECTION: WEATHER RISKS ── -->
      <div class="weather-risk-section">
        <div class="section-header">
          <span class="icon-wrap">${renderSvgIcon("alert", 16, "#d97706")}</span>
          WEATHER RISK
        </div>
        <div class="weather-risk-grid">
          ${data.weatherRisks.map(risk => {
            const color = getRiskColor(risk.level);
            const bg = getRiskBg(risk.level);
            const border = getRiskBorder(risk.level);
            return `
              <div class="weather-card">
                <div class="weather-icon-bubble" style="background:${bg};border:1px solid ${border};color:${color};">
                  ${renderSvgIcon(risk.type, 18, color)}
                </div>
                <div class="weather-title">${risk.title}</div>
                <div class="weather-badge" style="background:${bg};color:${color};border-color:${border};">
                  ${risk.level}
                </div>
                <div class="weather-desc">${risk.description}</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- ── SECTION: FARM RISK - PEST, DISEASE & SOIL ── -->
      <div class="farm-risk-section">
        <div class="section-header-inline">
          <div class="section-header" style="margin-bottom:0;">
            <span class="icon-wrap">${renderSvgIcon("bug", 16, "#dc2626")}</span>
            FARM RISK — PEST, DISEASE &amp; SOIL
          </div>
          <span class="risk-badge" style="background:${getRiskBg(data.farmRisk.overallLevel)};color:${getRiskColor(data.farmRisk.overallLevel)};border-color:${getRiskBorder(data.farmRisk.overallLevel)};">
            ${data.farmRisk.overallLevel}
          </span>
        </div>
        <div class="card" style="margin-top:8px;">
          <div class="farm-risk-grid">
            <div>
              <div class="farm-risk-context">${data.farmRisk.contextText}</div>
              <div class="todo-list">
                ${data.farmRisk.actions.map(action => `
                  <div class="todo-item">
                    ${renderActionBadge(action.icon)}
                    <div style="flex:1;">
                      <div class="todo-title">${action.title}</div>
                      <div class="todo-desc">${action.description}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="soil-panel">
              <div class="irrigation-pill">
                ${renderSvgIcon("irrigation", 16, "#0284c7")}
                <span>${data.farmRisk.irrigationNote}</span>
              </div>
              <div class="transition-title">
                ${renderSvgIcon("chart", 15, "#0f172a")}
                <span>${data.farmRisk.soilTransition.fromState} &rarr; ${data.farmRisk.soilTransition.toState}</span>
              </div>
              <svg viewBox="0 0 340 100" class="soil-chart-svg">
                <defs>
                  <linearGradient id="soilCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0284c7" stop-opacity="0.28" />
                    <stop offset="100%" stop-color="#0284c7" stop-opacity="0.0" />
                  </linearGradient>
                </defs>

                <!-- Zone Background Bands with subtle borders -->
                <rect x="52" y="6" width="280" height="24" fill="#eff6ff" opacity="0.8" rx="3"/>
                <line x1="52" y1="30" x2="332" y2="30" stroke="#dbeafe" stroke-width="1"/>
                
                <rect x="52" y="30" width="280" height="24" fill="#f0fdf4" opacity="0.8" />
                <line x1="52" y1="54" x2="332" y2="54" stroke="#dcfce7" stroke-width="1"/>
                
                <rect x="52" y="54" width="280" height="24" fill="#fffbeb" opacity="0.8" rx="3"/>

                <!-- Left Y-Axis Zone Labels (Clear, bold, no overlap) -->
                <text x="44" y="22" font-size="8.5" fill="#1e40af" font-weight="800" text-anchor="end">ABN. WET</text>
                <text x="44" y="46" font-size="8.5" fill="#166534" font-weight="800" text-anchor="end">MOD. WET</text>
                <text x="44" y="70" font-size="8.5" fill="#b45309" font-weight="800" text-anchor="end">NORMAL</text>

                <!-- Soil Moisture Area Fill -->
                <path d="M 60 48 Q 140 45 220 28 T 325 15 L 325 78 L 60 78 Z" fill="url(#soilCurveGrad)" />

                <!-- Trend Line -->
                <path d="M 60 48 Q 140 45 220 28 T 325 15" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />

                <!-- Start Point ("NOW") -->
                <circle cx="60" cy="48" r="3.5" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
                <rect x="50" y="33" width="28" height="11" rx="2" fill="#0f172a"/>
                <text x="64" y="41.5" font-size="7" fill="#ffffff" font-weight="800" text-anchor="middle">NOW</text>

                <!-- Rain Event Point -->
                <line x1="240" y1="18" x2="240" y2="78" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />
                <circle cx="240" cy="24" r="4" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
                
                <!-- Rain Event Callout Badge -->
                <g transform="translate(216, 4)">
                  <rect x="0" y="0" width="48" height="14" rx="3" fill="#0284c7" />
                  <text x="24" y="10" font-size="8" fill="#ffffff" font-weight="800" text-anchor="middle">🌧 13.5 mm</text>
                </g>

                <!-- Bottom X-Axis Timeline Dates -->
                <line x1="52" y1="78" x2="332" y2="78" stroke="#cbd5e1" stroke-width="1"/>
                <text x="60" y="90" font-size="8" fill="#64748b" font-weight="600" text-anchor="middle">25 Aug</text>
                <text x="120" y="90" font-size="8" fill="#64748b" font-weight="600" text-anchor="middle">28 Aug</text>
                <text x="180" y="90" font-size="8" fill="#64748b" font-weight="600" text-anchor="middle">1 Sep</text>
                <text x="240" y="90" font-size="8" fill="#0284c7" font-weight="800" text-anchor="middle">4 Sep</text>
                <text x="325" y="90" font-size="8" fill="#64748b" font-weight="600" text-anchor="middle">9 Sep</text>
              </svg>
              <div class="todo-desc" style="margin-top:6px;">${data.farmRisk.soilTransition.trendSummary}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SECTION: 16-DAY FORECAST ── -->
      <div class="forecast-section">
        <div class="section-header">
          <span class="icon-wrap">${renderSvgIcon("chart", 16, "#2563eb")}</span>
          16-DAY FORECAST — HIGH/LOW °C &amp; RAIN (MM)
        </div>
        <div class="card">
          <div class="forecast-grid">
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
          <div class="forecast-footer-note">
            ${data.forecastSummaryFooter}
          </div>
        </div>
      </div>
    </div>

    <!-- ── FOOTER ── -->
    <div class="footer">
      <div>© 2026 FarmRisk Corporation · Advisory only — not for regulatory submission</div>
      <div>Verified against satellite hydrology &amp; bias corrections · Confirm with local agri-extension officer</div>
    </div>
  </div>
</body>
</html>`;
}
