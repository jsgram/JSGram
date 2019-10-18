import { Request, Response, NextFunction } from 'express';
import { ICommentModel } from '../../models/comment.model';
import { addCommentIdToPost, createComment } from '../../db.requests/add.comments.requests';
import { serverError } from '../../common.constants/errors.constants';

export const addComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {body: {postId, authorId, comment}}: { body: ICommentModel } = req;

        const createdComment = await createComment(postId, authorId, comment, next);
        if (!createdComment) {
            const message = 'Can not create comment';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        const {_id: commentId}: ICommentModel = createdComment as ICommentModel;

        const updatedPost = await addCommentIdToPost(postId, commentId, next);
        if (!updatedPost) {
            const message = 'Can not create comment';

            console.warn(new Error(message));
            next({ message, status: 500 });
        }

        res.json({message: 'Comment added successfully', createdComment, updatedPost});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
