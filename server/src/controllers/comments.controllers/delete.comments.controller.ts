import { Request, Response, NextFunction } from 'express';
import { ICommentModel } from '../../models/comment.model';
import { deleteComment, deleteCommentFromPost } from '../../db.requests/delete.comments.requests';
import { serverError } from '../../common.constants/errors.constants';

export const deleteComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body: { authorId }, params: { id: commentId } }: any = req;
        const { locals: { user: { id: loggedUserId, isAdmin } } }:
        { locals: { user: { id: { loggedUserId: string }, isAdmin: boolean } } } = res;

        if (authorId !== loggedUserId && !isAdmin) {
            const message = `Unauthorized attempt to delete comment ${commentId}.`;

            console.warn(new Error(message));
            next({ message, status: 401 });
        }

        const deletedComment = await deleteComment(commentId, next);
        if (!deletedComment) {
            const message = `Cannot delete comment ${commentId}.`;

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const {postId}: ICommentModel = deletedComment as ICommentModel;

        const updatedPost = await deleteCommentFromPost(postId, commentId, next);
        if (!updatedPost) {
            const message = `Cannot delete comment ${commentId} from post ${postId}.`;

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({ message: 'Comment deleted successfully.', updatedPost });
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
