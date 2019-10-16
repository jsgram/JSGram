import { NextFunction } from 'express';
import { Tag } from '../models/tag.model';

export const createTag = async (tag: string, postId: string, next: NextFunction): Promise<void> => {
    try {
        const filter = {tagName: tag};
        const update = {$push: { posts: postId }};
        await Tag.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true,
        });
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};

export const deleteTags = async (postId: string, next: NextFunction): Promise<void> => {
    try {
        await Tag.updateMany({ posts: postId }, { $pull: { posts: postId }});
        await Tag.deleteMany({ posts: { $exists: true, $size: 0 }});
    } catch (e) {
        next({ status: 500, message: e.message });
    }
};
