import { Request, Response, NextFunction } from 'express';
import { updateComment } from '../../db.requests/update.comment.request';
import { IUserModel, User } from '../../models/user.model';
import { Comment, ICommentModel } from '../../models/comment.model';
import { serverError } from '../../common.constants/errors.constants';

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
            const message = 'Comment doesn\'t exist';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const user = await User.findById((searchComment as ICommentModel).authorId);
        if (user && decodedTokenEmail !== user.email && !isAdmin) {
            const message = 'You don\'t have permission to change comment';

            console.warn(new Error(message));
            next({ message, status: 403 });
        }

        const updatedComment = await updateComment(id, comment, next);

        if (!updatedComment) {
            const message = 'Error updating comment';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({message: 'Comment was successfully updated', updatedComment});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
