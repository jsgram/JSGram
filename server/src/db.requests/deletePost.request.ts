import { Post } from '../models/post.model';

export const deletePost = async (id: string): Promise<any> => {
    const delPost = await Post.findByIdAndDelete(id);

    return delPost;
};
