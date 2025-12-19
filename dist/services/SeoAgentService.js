"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seoAgent = void 0;
const googleapis_1 = require("googleapis");
const sheetsApi = googleapis_1.google.sheets("v4");
const seoLLm_1 = require("../agents/seoLLm");
async function fetchAllSheets(spreadsheetId) {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const client = await auth.getClient();
    const meta = await sheetsApi.spreadsheets.get({
        spreadsheetId: process.env.spreadsheetId,
        auth: client,
    });
    const result = {};
    for (const s of meta.data.sheets || []) {
        const name = s.properties?.title;
        if (!name)
            continue;
        const res = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${name}!A:Z`,
            auth: client,
        });
        const rows = res.data.values || [];
        if (rows.length === 0)
            continue;
        const [headers, ...data] = rows;
        result[name] = data.slice(0, 100).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
    }
    return result;
}
const seoAgent = async (input) => {
    const allsheets = await fetchAllSheets(process.env.spreadsheetId);
    const explaination = await (0, seoLLm_1.seoLLMAnswer)(input.query, allsheets);
    console.log("SeoAgent called");
    return explaination;
};
exports.seoAgent = seoAgent;
