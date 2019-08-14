import {NextFunction, Request, Response} from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500)
        .json({message: err});
};
