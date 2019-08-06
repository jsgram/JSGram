import jwt from 'jsonwebtoken';

export const encodeJWT = function(username: string, secret: string) {
	return jwt.sign({ username }, secret, { expiresIn: '24h' });
};

export const decodeJWT = function(token: string, secret: string) {
	return jwt.verify(token, secret);
};
