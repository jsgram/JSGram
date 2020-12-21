import { Request, Response, NextFunction } from 'express';
import { updateComment } from '../../db.requests/update.comment.request';
import { IUserModel, User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';

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
        const {body: {comment}}: IReqBody = req;
        const {locals: {user: {email: decodedTokenEmail, isAdmin}}}: { locals: { user: IUserModel } } = res;

        const searchComment = await Comment.findById(id);
        if (!searchComment) {
            throw new Error('Comment doesn\'t exist');
        }

        const user = await User.findById(searchComment.authorId);
        if (user && decodedTokenEmail !== user.email && !isAdmin) {
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
