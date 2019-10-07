import { Post, IPostModel } from '../models/post.model';
import { Tag } from '../models/tag.model';
import { NextFunction } from 'express';

export const updatePost = async (
    id: string,
    description: string,
    tags: string[],
    userId: string,
    isAdmin: boolean,
    next: NextFunction,
): Promise<IPostModel | void> => {
    try {
        const updPost = await Post.findById(id);
        if (!updPost) {
            throw new Error('Post doesn\'t exist');
        }
        if (!isAdmin && updPost.author.toString() !== userId.toString()) {
            throw new Error('You do not have permission to edit post');
        }
        await updPost.updateOne({description, tags}, {new: true});

        await Tag.updateMany({posts: id}, { $pull: {posts: id}});
        await Tag.remove({ posts: { $exists: true, $size: 0 } });

        tags.forEach(async (tag: string) => {
            const filter = {tagName: tag};
            const update = {$push: { posts: id }};
            await Tag.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true,
            });
        });

        return updPost;
    } catch (e) {
        next({message: 'Post doesn\'t exist', status: 409});
    }
};
