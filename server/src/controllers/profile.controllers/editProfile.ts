import {NextFunction, Request, Response} from 'express';

import { editUser } from '../../db.requests/user.requests';

export const editProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { user }: any = req.body;

        const updatedUser = await editUser(user.email, user, next);
        if (!updatedUser) {
            throw new Error('User has not been updated');
        }
        res.json({updatedUser, status: 'Profile changed'});
    } catch (e) {
        next({message: 'Password has not been update', status: 409});
    }
};
