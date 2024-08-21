import { Request, Response } from "express";
import mongoose from "mongoose";
// src/index.js
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;
const MONGODB_URL = process.env.MONGOOSE_DB_URL || '';

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});


mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(port, () => {
          console.log(`[server]: ⚡️ Server is running at http://localhost:${port}`);
          console.log("Connected to %s", MONGODB_URL);
          console.log("Press CTRL + C to stop the process. \n");
        });
    })
    .catch((err) => {
        console.error("App starting error:", err.message);
        process.exit(1);
    });
mongoose.connection;

