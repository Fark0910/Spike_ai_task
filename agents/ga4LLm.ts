import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.API_KEY, 
  baseURL: process.env.BASE_URL,       
});

export async function llmLiteExplain(
  userQuery:any,
  ga4Request:any,
  ga4Response:any,
) {
  const prompt = `
You are a senior GA4 analytics expert.

USER QUESTION:
${userQuery}

GA4 REQUEST (what was queried):
${JSON.stringify(ga4Request, null, 2)}

GA4 RESPONSE (raw data):
${JSON.stringify(ga4Response, null, 2)}

TASK:
1. Explain what metrics and dimensions were used
2. Summarize the results in simple language
3. If data is empty or sparse, clearly say so
4. If trends are visible, describe them
5. Do NOT hallucinate numbers

Return a clear, concise explanation.
`;

  const completion = await client.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
  });
  console.log("Lite LLM Explanation:", completion.choices[0].message.content);
  return completion.choices[0].message.content;
}