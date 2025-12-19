import { UserQuery } from "../types/api";
import detectIntent  from "../utils/IntentClassifier";
import { seoAgent } from "../services/SeoAgentService";
import { ga4Agent } from "../services/Ga4AgentService";
import { mixedAgent } from "../services/MixedAgentService";

const orchestrator = async (input: UserQuery) => {
  const query = (input.query || "").trim();
  const propertyId = input.propertyId ?? null;

  if (!query) {
    return {
      status: "error",
      error: "Query is required",
    };
  }

  const intent = detectIntent(query);

  switch (intent) {
    case "SEO":
        const seo=await seoAgent({propertyId:propertyId!, query:query});
      return seo;

    case "GA4":
      if (!propertyId) {
        return {
          status: "error",
          intent: "GA4",
          error: "GA4 propertyId is required for analytics queries",
        };
      }
      const ga4=await ga4Agent({propertyId:propertyId, query:query});
      return ga4;

    case "MIXED":
      if (!propertyId) {
        return {
          status: "error",
          intent: "MIXED",
          error: "propertyId required for GA4 part of mixed query",
        };
      }

      return await ga4Agent({propertyId:propertyId, query:query});

    case "UNKNOWN":
    default:
      return {
        status: "ok",
        intent: "UNKNOWN",
        message:
          "Could not confidently classify intent. Please refine query or specify context (SEO / GA4).",
      };
  }
};

export = orchestrator;