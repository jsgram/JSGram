import bcrypt from 'bcrypt';

const hashRounds = 12;

export const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(hashRounds);
    return bcrypt.hashSync(password, salt);
};

export const isCorrectPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};
