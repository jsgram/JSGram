import jwt from 'jsonwebtoken';

export const encodeJWT = (username: string, secret: string): string => {
    return jwt.sign({username}, secret, {expiresIn: '24h'});
};

export const decodeJWT = (token: string, secret: string): string | object => {
    return jwt.verify(token, secret);
};
