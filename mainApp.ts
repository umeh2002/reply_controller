import express, { Application, Request, Response } from "express";
import cors from "cors";

import users from "./Router/replyRouter";
// shallipopi

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Welcome Home",
      });
    } catch (error) {
      console.log(error);
    }
  });
  app.use("/api/v1/", users);

 
  
};