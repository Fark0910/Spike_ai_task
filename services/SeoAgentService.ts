import { google } from "googleapis";
const sheetsApi = google.sheets("v4");
import { UserQuery } from "../types/api";
import { seoLLMAnswer } from "../agents/seoLLm";
async function fetchAllSheets(spreadsheetId: string) {
  const auth:any = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const client = await auth.getClient();
  const meta = await sheetsApi.spreadsheets.get({
    spreadsheetId: process.env.spreadsheetId,
    auth: client,
  });

  const result: Record<string, any[]> = {};
  for (const s of meta.data.sheets || []) {
    const name = s.properties?.title;
    if (!name) continue;
    const res = await sheetsApi.spreadsheets.values.get({
      spreadsheetId,
      range:`${name}!A:Z`,
      auth: client,
    });

    const rows = res.data.values || [];
    if (rows.length === 0) continue;

    const [headers, ...data] = rows;

    result[name] = data.slice(0, 100).map(r =>
      Object.fromEntries(headers.map((h, i) => [h, r[i]]))
    );
  }

  return result;
}

export const seoAgent= async (input: UserQuery):Promise<any> => {
    const allsheets=await fetchAllSheets(process.env.spreadsheetId!);
    const explaination=await seoLLMAnswer(input.query!, allsheets);
    console.log("SeoAgent called");
    return explaination;
}


