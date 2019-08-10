import {NextFunction} from 'express';
import {ITokenModel, Token} from '../models/token.model';

export const tokenExist = async (token: string, next: NextFunction): Promise<ITokenModel | undefined | null> => {
    try {
        return await Token.findOne({token});
    } catch (e) {
        next(e);
    }
};
