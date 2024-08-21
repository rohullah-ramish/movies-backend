import { Request, Response } from "express";

exports.login = async (req:Request, res:Response) => {
    try {
        
        return res.status(200).json({ message: "login successfully", data:req.body });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error })
    }
}