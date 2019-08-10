import bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => {
    const rounds = +`${process.env.ROUNDS}`;
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(password, salt);
};
