import { Request, Response, NextFunction } from 'express';
import { tokenVerification } from '../../helpers/token.verification';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.get('x-access-token');
        if (!token) {
            return res.status(401).send({errors: [{title: 'Unauthorized', detail: 'Invalid token'}]})
                      .redirect(`${process.env.FRONT_PATH}/`);
        }
        const user = await tokenVerification(token, res, next);
        if (!user) {
            return res.status(401).send({errors: [{title: 'Unauthorized', detail: 'Invalid token'}]})
                      .redirect(`${process.env.FRONT_PATH}/`);
        }
        res.locals.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
