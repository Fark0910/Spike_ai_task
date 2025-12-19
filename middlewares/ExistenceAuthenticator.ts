import path from "path";
import { UserQuery,UserError } from "../types/api";
import { Request, Response, NextFunction } from "express";
const propid_query_exist=async(req: Request<UserQuery>, res: Response<UserError>, next: NextFunction) =>{
  if (!req.body || Object.keys(req.body).length === 0)
  {
    return res.status(400).json({ status:"error",response: "PropertyId and query were missing", error: "missing Fields!" });
  }
  if (!req.body.query) {
    return res.status(400).json({ status:"error",response: "Query parameter was missing", error: "missing Fields!" });
  }
  next();

}
export= propid_query_exist;