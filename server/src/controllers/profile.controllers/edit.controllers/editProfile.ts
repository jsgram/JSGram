import {NextFunction, Request, Response} from 'express';
import { editUser } from '../../../db.requests/user.requests';

export const editProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { user }: Request = req.body;
        const { locals: { user: { id: loggedUserId } } }: Response = res;
        if (loggedUserId !== user._id) {
            const message = 'Unauthorized attempt to edit profile';

            console.warn(new Error(message));
            next({ message, status: 403 });
        }
        const updatedUser = await editUser(user.email, user, next);
        if (!updatedUser) {
            const message = 'User has not been updated';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }
        res.json({updatedUser, status: 'Profile changed'});
    } catch (e) {
        console.error(e);
        next({ message: 'Password has not been update', status: 500 });
    }
};
