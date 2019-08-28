import { Post } from '../models/post.model';
import { User } from '../models/user.model';

export const deletePost = async (postId: string, userId: string): Promise<any> => {
    const delPost = await Post.findByIdAndDelete(postId);

    await User.findByIdAndUpdate(userId, { $pull: {posts: postId} });

    return delPost;
};
