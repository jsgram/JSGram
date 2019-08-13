import {NextFunction} from 'express';
import {ITokenModel, Token} from '../models/token.model';

export const tokenExist = async (token: string, next: NextFunction): Promise<ITokenModel | undefined | null> => {
    try {
        const isToken = await Token.findOne({token});
        if (!isToken) {
            throw new Error('Token does not exist');
        }
        return isToken;
    } catch (e) {
        next(e);
    }
};
