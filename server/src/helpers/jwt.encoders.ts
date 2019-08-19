import jwt from 'jsonwebtoken';

export const encodeJWT = (email: string, secret: string): string => {
    return jwt.sign({email}, secret, {expiresIn: '24h'});
};

export const decodeJWT = (token: string, secret: string): string | object => {
    return jwt.verify(token, secret);
};
