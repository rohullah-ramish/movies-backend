import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password' });
    }
};

export default hashPassword;