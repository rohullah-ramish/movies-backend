import { Request, Response } from "express";

// src/index.js
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`[server]: ⚡️ Server is running at http://localhost:${port}`);
});
