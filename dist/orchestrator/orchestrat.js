"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const IntentClassifier_1 = __importDefault(require("../utils/IntentClassifier"));
const SeoAgentService_1 = require("../services/SeoAgentService");
const Ga4AgentService_1 = require("../services/Ga4AgentService");
const orchestrator = async (input) => {
    const query = (input.query || "").trim();
    const propertyId = input.propertyId ?? null;
    if (!query) {
        return {
            status: "error",
            error: "Query is required",
        };
    }
    const intent = (0, IntentClassifier_1.default)(query);
    switch (intent) {
        case "SEO":
            const seo = await (0, SeoAgentService_1.seoAgent)({ propertyId: propertyId, query: query });
            return seo;
        case "GA4":
            if (!propertyId) {
                return {
                    status: "error",
                    intent: "GA4",
                    error: "GA4 propertyId is required for analytics queries",
                };
            }
            const ga4 = await (0, Ga4AgentService_1.ga4Agent)({ propertyId: propertyId, query: query });
            return ga4;
        case "MIXED":
            if (!propertyId) {
                return {
                    status: "error",
                    intent: "MIXED",
                    error: "propertyId required for GA4 part of mixed query",
                };
            }
            return await (0, Ga4AgentService_1.ga4Agent)({ propertyId: propertyId, query: query });
        case "UNKNOWN":
        default:
            return {
                status: "ok",
                intent: "UNKNOWN",
                message: "Could not confidently classify intent. Please refine query or specify context (SEO / GA4).",
            };
    }
};
module.exports = orchestrator;
