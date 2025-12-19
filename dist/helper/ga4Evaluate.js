"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GA4_PROMPT = void 0;
const gem_1 = __importDefault(require("../utils/gem"));
const GA4_PROMPT = async (query) => {
    const promp = `
You are a Google Analytics 4 (GA4) query planner.

Your task:
Given a natural language analytics question, extract GA4 parameters.

Rules:
- Return ONLY valid JSON
- Do NOT explain anything
- Do NOT add extra text
- Do NOT wrap in markdown
- If unsure, make the best reasonable assumption
- Dont hallucinate data

Required JSON format:
- Metrics and dimensions MUST be valid GA4 Data API names

Output JSON schema:
{
  "metrics": string[],
  "dimensions": string[],
  "dateRange": {
    "startDate": string,
    "endDate": string
  }
}
-For your reference, here are some common mappings:
Date rules:
- "last 7 days" → startDate: "7daysAgo"
- "last 14 days" → "14daysAgo"
- "last 30 days" → "30daysAgo"
- If no time mentioned → default to "7daysAgo" to "today"

Metric mapping examples:
- users → activeUsers
- sessions → sessions
- page views → screenPageViews
- conversions → conversions
- revenue → totalRevenue

Dimension mapping examples:
- daily → date
- page → pagePath
- source → sessionSource
- medium → sessionMedium
- country → country

Now process this query:
"${query}" `;
    console.log("GA4 Prompt:", promp);
    const resp = await (0, gem_1.default)(promp);
    if (!resp.text) {
        throw new Error("No response from Gemini API");
    }
    if (resp.text.includes("```")) {
        const cleanedText = resp.text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanedText);
        console.log("Parsed GA4 Prompt Response:", parsed);
        return parsed;
    }
    else if (resp.text.includes("```json")) {
        const cleanedText = resp.text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanedText);
        console.log("Parsed GA4 Prompt Response:", parsed);
        return parsed;
    }
    else {
        const parsed = JSON.parse(resp.text);
        console.log("Parsed GA4 Prompt Response:", parsed);
        return parsed;
    }
};
exports.GA4_PROMPT = GA4_PROMPT;
