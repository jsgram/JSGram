import bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => {
    const salt: string = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
};
