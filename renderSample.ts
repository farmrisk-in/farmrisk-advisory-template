import { generateAdvisoryHtml, AdvisoryReportData } from "./src/index";
import * as fs from "fs";
import * as path from "path";

// Exact sample data matching FarmRisk_Advisory_v3.pdf
const sampleData: AdvisoryReportData = {
  header: {
    farmName: "Farm",
    locationStr: "Gandhinagar, Gujarat — 382355",
    coordinates: "23.22°N, 72.70°E",
    issuedDate: "Wed, 5 Aug 2026",
    outlookPeriod: "16-day outlook · Kharif season",
    crop: "COTTON"
  },
  whatToDoToday: [
    {
      icon: "drainage",
      title: "Ensure field drainage",
      description: "Improve drainage to prevent waterlogging and reduce fungal disease risk (e.g. Alternaria) at flowering."
    },
    {
      icon: "irrigation",
      title: "Skip irrigation this week",
      description: "Soil is Moderate Wet and appears saturated — no irrigation needed for 7+ days. Focus on drainage."
    },
    {
      icon: "scout",
      title: "Scout for sucking pests",
      description: "Inspect for aphids, jassids, whiteflies before they cross thresholds; apply 2% DAP / 1% KNO₃ for boll retention."
    }
  ],
  aiOverview: {
    weatherSummary: "Over the next 16 days, Farm (Gandhinagar) will see <b>23.4 mm of rainfall</b> over <b>3 rainy days</b>, with a light <b>13.5 mm fall expected around 04 Sep</b> (~10 days out). Temperatures range <b>25.6–34.9°C</b>; humidity stays high with moderate winds.",
    soilSummary: "Soil moisture shifts from <b>Moderate Wet to Abnormally Wet</b> by period end. At this <b>flowering stage</b>, prioritise drainage to prevent waterlogging; monitor sucking pests and apply <b>2% DAP or 1% KNO₃</b> to improve boll retention.",
    riskSummary: "Excess soil moisture is a significant risk to root health — monitor fields frequently for drainage needs.",
    outlookBadge: "CAUTIONARY"
  },
  cropCalendar: {
    season: "KHARIF",
    cropName: "COTTON",
    currentStage: "Flowering stage",
    activeStageType: "growing"
  },
  weatherRisks: [
    {
      type: "heat",
      title: "Heat Stress",
      level: "MODERATE",
      description: "Peaks 34.9°C. Irrigate at dusk; avoid midday labour."
    },
    {
      type: "wind",
      title: "Wind",
      level: "LOW",
      description: "Moderate gusts. Can drift spray — spray on calm days only."
    },
    {
      type: "lightning",
      title: "Lightning",
      level: "LOW",
      description: "Isolated storms. Stay out of open fields during showers."
    },
    {
      type: "rain",
      title: "Heavy Rain",
      level: "MINIMAL",
      description: "No downpours. Risk is standing water, not new rain."
    },
    {
      type: "frost",
      title: "Frost",
      level: "NONE",
      description: "Not a factor this season. No action needed."
    }
  ],
  farmRisk: {
    overallLevel: "MEDIUM",
    contextText: "Warm temperatures and wet soil during Kharif raise the risk of sucking pests and fungal disease in cotton. At flowering/reproductive stage these conditions favour pest build-up, threatening boll retention and crop health.",
    actions: [
      {
        icon: "drainage",
        title: "Ensure field drainage",
        description: "Prevent waterlogging and reduce fungal disease (Alternaria) risk."
      },
      {
        icon: "scout",
        title: "Monitor sucking pests",
        description: "Inspect for aphids, jassids & whiteflies before threshold levels."
      },
      {
        icon: "remove",
        title: "Remove infected plants",
        description: "Rogue out infected plants to stop fungal disease spreading."
      }
    ],
    irrigationNote: "Irrigation not needed for 7+ days. Soil looks Moderate Wet and saturated — focus on drainage.",
    soilTransition: {
      fromState: "Moderate Wet",
      toState: "Abnormally Wet",
      trendSummary: "Soil moisture climbs steadily over the 16 days, crossing into Abnormally Wet after the 4 Sep rain. Watch root health; drainage is the priority."
    }
  },
  forecast16Day: [
    { dateStr: "25 AUG", dayName: "Mon", tmax: 34, tmin: 26, pcp: 1.2 },
    { dateStr: "26 AUG", dayName: "Tue", tmax: 34, tmin: 26, pcp: 0.3 },
    { dateStr: "27 AUG", dayName: "Wed", tmax: 33, tmin: 26, pcp: 0.5 },
    { dateStr: "28 AUG", dayName: "Thu", tmax: 33, tmin: 26, pcp: 0.6 },
    { dateStr: "29 AUG", dayName: "Fri", tmax: 33, tmin: 26, pcp: 0.4 },
    { dateStr: "30 AUG", dayName: "Sat", tmax: 34, tmin: 26, pcp: 0.3 },
    { dateStr: "31 AUG", dayName: "Sun", tmax: 34, tmin: 26, pcp: 0.5 },
    { dateStr: "01 SEP", dayName: "Mon", tmax: 35, tmin: 26, pcp: 0.6 },
    { dateStr: "02 SEP", dayName: "Tue", tmax: 34, tmin: 26, pcp: 2.1 },
    { dateStr: "03 SEP", dayName: "Wed", tmax: 33, tmin: 26, pcp: 0.6 },
    { dateStr: "04 SEP", dayName: "Thu", tmax: 32, tmin: 25, pcp: 13.5 },
    { dateStr: "05 SEP", dayName: "Fri", tmax: 33, tmin: 26, pcp: 0.6 },
    { dateStr: "06 SEP", dayName: "Sat", tmax: 33, tmin: 26, pcp: 0.5 },
    { dateStr: "07 SEP", dayName: "Sun", tmax: 34, tmin: 26, pcp: 0.4 },
    { dateStr: "08 SEP", dayName: "Mon", tmax: 34, tmin: 26, pcp: 0.0 },
    { dateStr: "09 SEP", dayName: "Tue", tmax: 34, tmin: 26, pcp: 0.4 }
  ],
  forecastSummaryFooter: "Blue-tinted days = rain expected. Total: 23.4 mm over 3 days; main fall ~13.5 mm on 4 Sep."
};

const htmlOutput = generateAdvisoryHtml(sampleData);
const outputPath = path.join(__dirname, "index.html");
fs.writeFileSync(outputPath, htmlOutput, "utf8");

console.log("Successfully generated index.html at", outputPath);
