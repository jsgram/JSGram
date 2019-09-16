import { Request, Response, NextFunction } from 'express';
import { ICommentModel } from '../../models/comment.model';
import { addCommentIdToPost, createComment } from '../../db.requests/add.comments.requests';

export const addComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {body: {postId, authorId, comment}}: { body: ICommentModel } = req;

        console.log(req.body);
        const createdComment = await createComment(postId, authorId, comment, next);
        if (!createdComment) {
            throw new Error('Can not create comment');
        }

        const {_id: commentId}: ICommentModel = createdComment;

        const updatedPost = await addCommentIdToPost(postId, commentId, next);
        if (!updatedPost) {
            throw new Error('Can not create comment');
        }

        res.json({message: 'Comment added successfully', createdComment, updatedPost});
    } catch (e) {
        next({status: 409, message: e.message});
    }
};
