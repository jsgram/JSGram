import { Request, Response, NextFunction } from 'express';
import { ICommentModel } from '../../models/comment.model';
import { deleteComment, deleteCommentFromPost } from '../../db.requests/delete.comments.requests';

export const addComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body: { commentId } }: Request = req;

        const deletedComment = await deleteComment(commentId, next);
        if (!deletedComment) {
            throw new Error(`Cannot delete comment ${commentId}.`);
        }

        const { postId }: ICommentModel = deletedComment;

        const updatedPost = await deleteCommentFromPost(postId, commentId, next);
        if (!updatedPost) {
            throw new Error(`Cannot delete comment ${commentId} from post ${postId}.`);
        }

        res.json({ message: 'Comment deleted successfully.', updatedPost });
    } catch (e) {
        next({ status: 409, message: e.message });
    }
};
