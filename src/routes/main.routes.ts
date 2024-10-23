import { Request, Response } from "express";

const express = require("express");
const userRoute = require("./user.routes");
const MovieRoute = require("./movie.routes");

const router = express.Router();

router.use("/users", userRoute);
router.use("/movies", MovieRoute);
router.get("/test", (req:Request,res:Response)=>{
    console.log('cookies',req.cookies)
    res.status(200).json({message:"api hit !"})
});

module.exports = router;
