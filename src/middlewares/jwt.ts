const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret-key"; 
const JWT_EXPIRES_IN = "1h"; // Token expiry time

interface JwtPayload {
    id: string;
    email: string;
}
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
