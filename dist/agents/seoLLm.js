"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seoLLMAnswer = seoLLMAnswer;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const llm = new openai_1.default({
    apiKey: process.env.API_KEY,
    baseURL: process.env.BASE_URL,
});
async function seoLLMAnswer(query, allSheetsData) {
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
