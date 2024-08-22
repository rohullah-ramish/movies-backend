import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password:string) => {
    try {
        if (password) {
            return await bcrypt.hash(password, saltRounds);
        }
    } catch (error) {
        throw new Error('undefined Password');
    }
};

export default hashPassword;