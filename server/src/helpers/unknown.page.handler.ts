import {Request, Response, NextFunction} from 'express';

export const unknownPageHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        throw Error('404, unknown page');
    } catch (e) {
        next(e);
    }
};
