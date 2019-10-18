import { NextFunction, Request, Response } from 'express';
import { deleteUser } from '../../db.requests/delete.user.requests';
import { deletePost } from '../../db.requests/deletePost.request';
import { serverError } from '../../common.constants/errors.constants';

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params: { id: userId } }: Request = req;
        const { locals: { user: { isAdmin } } }: Response = res;

        if (!isAdmin) {
            const message = `Unauthorized attempt to delete user ${userId}.`;

            console.warn(new Error(message));
            next({ message, status: 403 });
        }
        const deletedUser = await deleteUser(userId, next);
        if (!deletedUser) {
            const message = `Cannot delete user ${userId}.`;

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({ message: 'User deleted successfully.', deletedUser });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
