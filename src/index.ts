import { Request, Response } from "express";

// src/index.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoute = require('./routers/api');
const db_connection=require('./db/config')
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});
// app.use('/api',apiRoute);



app.listen(port, () => {
  console.log(`[server]: ⚡️ Server is running at http://localhost:${port}`);
 
  console.log("Press CTRL + C to stop the process. \n");
});

