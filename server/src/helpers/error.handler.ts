import { NextFunction, Request, Response } from 'express';

export interface IError {
    status: number;
    message: string;
}

export const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction): Response => {
    return res.status(err.status || 500)
        .json({message: err.message || 'Unknown error'});
};
