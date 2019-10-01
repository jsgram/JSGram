import {NextFunction, Request, Response} from 'express';
import { editUser } from '../../../db.requests/user.requests';

export const editProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { user }: Request = req.body;
        const { locals: { user: { id: loggedUserId } } }: Response = res;
        if (loggedUserId !== user._id) {
            throw new Error('Unauthorized attempt to edit profile');
        }
        const updatedUser = await editUser(user.email, user, next);
        if (!updatedUser) {
            throw new Error('User has not been updated');
        }
        res.json({updatedUser, status: 'Profile changed'});
    } catch (e) {
        if (e.message) {
            next({ message: e.message, status: 400});
        } else {
            next({ message: 'Password has not been update', status: 500 });
        }
    }
};
