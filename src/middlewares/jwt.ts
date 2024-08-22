import { JwtPayload } from "../utils/interfaces/IJwt";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // Token expiry time

export const generateToken = (userId: string, email: string): string => {
    const payload: JwtPayload = { id: userId, email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
export const verifyToken = (token: string): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err: any, decoded: JwtPayload) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded as JwtPayload);
        });
    });
};
