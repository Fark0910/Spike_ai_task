import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import propId_  from "../middlewares/ExistenceAuthenticator";
import { UserQuery,UserError,UserResponse } from "../types/api";
import propid_query_exist from "../middlewares/ExistenceAuthenticator";
import orchestrat from "../orchestrator/orchestrat";
dotenv.config();
const router = Router();


router.use("/query",propid_query_exist)
router.post("/query",async (req: Request<UserQuery>, res: Response<UserError>) => {
  if (req.body.query.trim()===""){
    return res.status(400).json({ status:"error",response: "Query was empty", error: "Empty Field!" });
    }
  try {
    const resp = await orchestrat({ propertyId: req.body.propertyId, query: req.body.query });
    console.log(resp);
    res.status(200).json({ status:"ok",response: resp});
  } catch (err) {
    console.error(err);
    res.status(400).json({ status:"error",response: "Cant generate final response", error: `${err}`});
  }
});                   


export = router;