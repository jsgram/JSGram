import {Request, Response, NextFunction} from 'express';

export const logout = (req: Request, res: Response, next: NextFunction): void => {
    req.logOut();
    res.redirect(`${process.env.FRONT_PASS}`);
};
