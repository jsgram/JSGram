import { Post, IPostModel } from '../models/post.model';
import { User, IUserModel } from '../models/user.model';
import { Tag } from '../models/tag.model';

export const addPost = async (user: IUserModel, description: string, imgPath: string, tags: string[]):
                              Promise<IPostModel> => {
    const post = new Post({
        description,
        imgPath,
        author: user.id,
    });
    const newPost = await post.save();
    tags.forEach(async (tag: string) => {
        const filter = {tagName: tag};
        const update = {$push: { posts: newPost._id }};
        await Tag.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true,
        });
    });
    await User.findOneAndUpdate({_id: user.id}, {$push: { posts: newPost.id }});
    return newPost;
};
