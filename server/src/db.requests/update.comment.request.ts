import { NextFunction } from 'express';
import { Comment, ICommentModel } from '../models/comment.model';

export const updateComment = async (id: string, comment: string, next: NextFunction)
    : Promise<ICommentModel | null | void> => {
    try {

        const updatedComment = await Comment.findByIdAndUpdate(id, {comment}, {new: true});
        if (!updatedComment) {
            throw new Error('Comment doesn\'t exist');
        }
        return updatedComment;
    } catch (e) {
        next({message: 'Comment doesn\'t exist', status: 409});
    }
};
