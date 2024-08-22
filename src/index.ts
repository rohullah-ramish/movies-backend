const dotenv = require("dotenv");
dotenv.config();

import { Request, Response } from "express";

// src/index.js
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoute = require("./routes/main.routes");
const { initDB } = require("./db/config");

const app = express();
const port = process.env.PORT;

// database connection
initDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// apis routes
app.use("/api", apiRoute);

// throw 404 if URL not found
app.all("*", function (req: Request, res: Response) {
  return res.send, "Page not found";
});
app.listen(port, () => {
  console.log(`[server]: ⚡️ Server is running at http://localhost:${port}`);

  console.log("Press CTRL + C to stop the process. \n");
});
