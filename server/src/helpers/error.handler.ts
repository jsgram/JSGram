import {NextFunction, Request, Response} from 'express';

interface IError {
    message: string;
    status: number;
}

export const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction): void => {
    res.status(500)
        .json({message: err.message});
};
