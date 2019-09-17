import { Request, Response, NextFunction } from 'express';
import { ICommentModel } from '../../models/comment.model';
import { deleteComment, deleteCommentFromPost } from '../../db.requests/delete.comments.requests';

export const deleteComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {body: {authorId}, params: {id: commentId}}: any = req;
        const {locals: {user: {_id: loggedUserId}}}: {locals: {user: {_id: {loggedUserId: string}}}} = res;

        if (authorId !== loggedUserId.toString()) {
            throw new Error(`Unauthorized attempt to delete comment ${commentId}.`);
        }

        const deletedComment = await deleteComment(commentId, next);
        if (!deletedComment) {
            throw new Error(`Cannot delete comment ${commentId}.`);
        }

        const {postId}: ICommentModel = deletedComment;

        const updatedPost = await deleteCommentFromPost(postId, commentId, next);
        if (!updatedPost) {
            throw new Error(`Cannot delete comment ${commentId} from post ${postId}.`);
        }

        res.json({ message: 'Comment deleted successfully.', updatedPost });
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
