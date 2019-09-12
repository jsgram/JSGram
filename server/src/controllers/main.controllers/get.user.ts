import { Request, Response, NextFunction } from 'express';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user: { _id, username, email } } }: Response = res;

        res.json({
            _id,
            username,
            email,
        });
    } catch (e) {
        return next(e);
    }
};
