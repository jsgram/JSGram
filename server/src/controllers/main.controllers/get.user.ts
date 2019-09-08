import { Request, Response, NextFunction } from 'express';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user: { username, email } } }: Response = res;

        res.json({
            username,
            email,
        });
    } catch (e) {
        return next(e);
    }
};
