import { NextFunction } from 'express';
import { Post, IPostModel } from '../models/post.model';
import { User, IUserModel } from '../models/user.model';
import { createTag } from '../db.requests/tag.requests';

export const addPost = async (user: IUserModel, description: string, imgPath: string, tags: string[],
                              next: NextFunction): Promise<IPostModel | void> => {
    try {
        const post = new Post({
            description,
            imgPath,
            author: user.id,
        });
        const newPost = await post.save();

        tags.forEach(async (tag: string) => await createTag(tag, newPost._id, next));

        await User.findOneAndUpdate({_id: user.id}, {$push: { posts: newPost.id }});

        return newPost;
    } catch (e) {
        next({message: 'Post wasn\'t added', status: 400});
    }
};
