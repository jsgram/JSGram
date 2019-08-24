import { Post } from '../models/post.model';
import { IPostModel } from '../models/post.model';
import { IUserModel, User } from '../models/user.model';

export const addPost = async (user: IUserModel, description: string, imgPath: string, tags: string[]):
                              Promise<IPostModel> => {
    const post = new Post({
        description,
        imgPath,
        tags,
        author: user.id,
    });
    const newPost = await post.save();
    await User.findOneAndUpdate({_id: user.id}, {$push: { posts: newPost.id }});
    return newPost;
};
