import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const llm = new OpenAI({
  apiKey: process.env.API_KEY!,
  baseURL: process.env.BASE_URL!,
});

export async function seoLLMAnswer(
  query: string,
  allSheetsData: any
) {
  const prompt = `
You are an SEO audit expert.
USER QUESTION:
${query}
SCREAMING FROG / ANALYTICS DATA (JSON):
${JSON.stringify(allSheetsData, null, 2)}
RULES:
- Answer ONLY from given data
- Do not hallucinate URLs or numbers
- If data is insufficient, clearly say so
- Provide short explanation + insight

OUTPUT:
Clear natural language answer.
`;

  const res = await llm.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });
  console.log("SEO LLM Answer:", res.choices[0].message.content);

  return res.choices[0].message.content;
}