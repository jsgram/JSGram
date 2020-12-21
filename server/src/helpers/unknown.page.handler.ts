import {Request, Response, NextFunction} from 'express';

export const unknownPageHandler = (req: Request, res: Response, next: NextFunction): void => {
    try {
        throw Error('404, unknown page');
    } catch (e) {
        e.status = 404;
        next(e);
    }
};
