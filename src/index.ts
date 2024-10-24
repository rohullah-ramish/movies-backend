const dotenv = require("dotenv");
dotenv.config();

import { Request, Response } from "express";
// import swaggerDocs from "./utils/swagger";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";

// src/index.js
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoute = require("./routes/main.routes");
const { initDB } = require("./db/config");

const app = express();
const port = process.env.PORT;

// database connection
initDB();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

// Docs in JSON format
app.get("/docs.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
// app.use(helmet());
// apis routes
app.use("/", apiRoute);

// throw 404 if URL not found
app.all("*", function (req: Request, res: Response) {
  return res.send, "Page not found";
});
app.listen(port, async () => {
  console.log(`[server]: ⚡️ Server is running at http://localhost:${port}`);

  console.log("Press CTRL + C to stop the process. \n");

  // await swaggerDocs(app, port || "3000");
});
