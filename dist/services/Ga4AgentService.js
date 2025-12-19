"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ga4Agent = void 0;
const ga4Evaluate_1 = require("../helper/ga4Evaluate");
const data_1 = require("@google-analytics/data");
const ga4LLm_1 = require("../agents/ga4LLm");
const ga4Agent = async (input) => {
    console.log("Ga4Agent called with propertyId:", input.propertyId);
    const quer = input.query;
    const resp = await (0, ga4Evaluate_1.GA4_PROMPT)(input.query);
    console.log("GA4 Prompt Response:", resp);
    const client = new data_1.BetaAnalyticsDataClient({
        keyFilename: "credentials.json",
    });
    console.log("GA4 Client created:", resp.dateRange, resp.dimensions, resp.metrics);
    const metrics = resp.metrics.map((m) => ({ name: m, }));
    const dimensions = resp.dimensions.map((d) => ({ name: d, }));
    const dateRanges = [{ startDate: resp.dateRange.startDate, endDate: resp.dateRange.endDate }];
    const [respond] = await client.runReport({
        property: `properties/${input.propertyId}`,
        dimensions,
        metrics,
        dateRanges
    });
    const explaination = await (0, ga4LLm_1.llmLiteExplain)(quer, resp, respond);
    console.log("GA4 Report Response:", respond);
    console.log("GA4 Explanation:", explaination);
    return {
        explanation: explaination
    };
};
exports.ga4Agent = ga4Agent;
