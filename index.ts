import express, { Application } from "express";
import { mainApp } from "./mainApp";
;

const app: Application = express();

const port: number = 2966;

mainApp(app)

const server = app.listen(process.env.PORT || port, () => {
 console.log("server is listening")
});

process.on("uncaughtException", (err: any) => {
  console.log("Error", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Error", reason);
  server.close(() => {
    process.exit(1);
  });
});
