import { Post } from '../models/post.model';
import { IPostModel } from '../models/post.model';
import { IUserModel } from '../models/user.model';

export const addPost = (author: IUserModel, description: string, imgPath: string, tags: string[]): IPostModel => {
    const newPost = new Post({
        description,
        imgPath,
        tags,
        author: author.id,
    });

    newPost.save((error: Error, post: IPostModel) => {
        if (error) {
            throw new Error('Can not create new post');
        }
        author.posts.push(post.id);
        author.save();
    });

    return newPost;
};
