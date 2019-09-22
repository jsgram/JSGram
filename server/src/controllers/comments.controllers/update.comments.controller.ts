import { Request, Response, NextFunction } from 'express';
import { updateComment } from '../../db.requests/update.comment.request';
import { IUserModel } from '../../models/user.model';

interface IParams {
    params: {
        id: string;
    };
}

interface IReqBody {
    body: {
        comment: string;
        email: string;
    };
}

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {params: {id}}: IParams = req;
        const {body: {comment, email}}: IReqBody = req;
        const {locals: {user: {email: decodedTokenEmail, isAdmin}}}: { locals: { user: IUserModel } } = res;

        if (decodedTokenEmail !== email && !isAdmin) {
            throw new Error('You don\'t have permission to change comment');
        }

        const updatedComment = await updateComment(id, comment, next);

        if (!updatedComment) {
            throw new Error('Comment doesn\'t exist');
        }

        res.json({message: 'Comment was successfully updated', updatedComment});
    } catch (e) {
        next({message: e.message, status: 409});
    }
};
