const bcrypt = require('bcrypt');

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error verifying password');
    }
};

export default verifyPassword;
