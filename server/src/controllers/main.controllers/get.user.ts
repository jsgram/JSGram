import { Request, Response, NextFunction } from 'express';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user: { _id, username, email, photoPath, isAdmin } } }: Response = res;

        res.json({
            _id,
            username,
            email,
            photoPath,
        });
    } catch (e) {
        return next(e);
    }
};
