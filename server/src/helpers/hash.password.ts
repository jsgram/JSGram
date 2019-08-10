import bcrypt from 'bcrypt';

const hashRounds = 12;

export const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(hashRounds);
    return bcrypt.hashSync(password, salt);
};
