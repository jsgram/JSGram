import {NextFunction} from 'express';
import {ITokenModel, Token} from '../models/token.model';

export const isTokenExist = async (token: string, next: NextFunction): Promise<ITokenModel | undefined | null> => {
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

export const deleteToken = async (id: string, next: NextFunction): Promise<ITokenModel | undefined | null> => {
    try {
        const isToken = await Token.findByIdAndRemove(id);
        if (!isToken) {
            throw new Error('Token does not remove');
        }
        return isToken;
    } catch (e) {
        next(e);
    }
};
