import { Post, IPostModel } from '../models/post.model';

export const updatePost = async (id: string, description: string, tags: string[]): Promise<IPostModel | null> => {
    const updPost = await Post.findByIdAndUpdate(id, {description, tags}, {new: true});

    return updPost;
};
