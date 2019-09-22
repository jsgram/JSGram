import { NextFunction, Request, Response } from 'express';
import { deleteUser } from '../../db.requests/delete.user.requests';

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params: { id: userId } }: Request = req;
        const { locals: { user: { isAdmin } } }: Response = res;

        if (!isAdmin) {
            throw new Error(`Unauthorized attempt to delete user ${userId}.`);
        }
        const deletedUser = await deleteUser(userId, next);
        if (!deletedUser) {
            throw new Error(`Cannot delete user ${userId}.`);
        }

        res.json({ message: 'User deleted successfully.', deletedUser });
    } catch (e) {
        next({ status: 409, message: e.message });
    }
};
