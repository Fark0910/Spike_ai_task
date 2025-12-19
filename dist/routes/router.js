"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const ExistenceAuthenticator_1 = __importDefault(require("../middlewares/ExistenceAuthenticator"));
const orchestrat_1 = __importDefault(require("../orchestrator/orchestrat"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.use("/query", ExistenceAuthenticator_1.default);
router.post("/query", async (req, res) => {
    if (req.body.query.trim() === "") {
        return res.status(400).json({ status: "error", response: "Query was empty", error: "Empty Field!" });
    }
    try {
        const resp = await (0, orchestrat_1.default)({ propertyId: req.body.propertyId, query: req.body.query });
        console.log(resp);
        res.status(200).json({ status: "ok", response: resp });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: "error", response: "Cant generate final response", error: `${err}` });
    }
});
module.exports = router;
