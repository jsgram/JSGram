import {NextFunction, Request, Response} from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(res.statusCode)
        .json({message: err.message});
};
