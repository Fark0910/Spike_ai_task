import { UserQuery } from "../types/api"
import { GA4_PROMPT } from "../helper/ga4Evaluate";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { start } from "repl";
import { llmLiteExplain } from "../agents/ga4LLm";
export const ga4Agent= async (input: UserQuery):Promise<any> => {
    console.log("Ga4Agent called with propertyId:", input.propertyId);
    const quer= input.query;
    const resp= await GA4_PROMPT(input.query);
    console.log("GA4 Prompt Response:", resp);
    const client = new BetaAnalyticsDataClient({
        keyFilename: "credentials.json",
});
console.log("GA4 Client created:",resp.dateRange,resp.dimensions,resp.metrics);
const metrics= resp.metrics.map((m:string)=>({name:m,}));
const dimensions= resp.dimensions.map((d:string)=>({name:d,}));
const dateRanges= [{startDate:resp.dateRange.startDate,endDate:resp.dateRange.endDate}];
    
    const [respond]=await client.runReport({
        property:`properties/${input.propertyId}`,
        dimensions,
        metrics,
        dateRanges
    })
    const explaination=await llmLiteExplain(quer,resp,respond);
    console.log("GA4 Report Response:", respond);
    console.log("GA4 Explanation:", explaination);
    return {
        explanation: explaination
};
}


