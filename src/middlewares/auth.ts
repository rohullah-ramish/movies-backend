import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';


interface JwtPayload {
    id: string;
    email: string;
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing',success:false });
    }
    try {
        const decoded = await verifyToken(token) as JwtPayload;
        // Attach user info to request
        (req as any).user = decoded;
        next();
    } catch (error) {
        // console.error('Token verification failed:', error);
       return res.status(403).json({ message: 'Invalid or expired token',success:false });
    }
};