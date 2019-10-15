import { deleteLike, removeUserIdFromPost } from '../remove.like.requsets';

import mockingoose from 'mockingoose';
import { Like } from '../../models/like.model';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Remove like requests tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('deleteLike test', async () => {
        mockingoose(Like).toReturn(null, 'findOneAndDelete');
        const fakeLike = Like.findOneAndDelete();

        const mockLike = jest.spyOn(Like, 'findOneAndDelete');
        mockLike.mockReturnValue(fakeLike);

        const answer = await deleteLike('postId', 'userId', fakeNext);
    });

    test('removeUserIdFromPost test', async () => {
        mockingoose(Post).toReturn(null, 'findOneAndUpdate');
        const fakePost = Post.findOneAndUpdate();

        const mockPost = jest.spyOn(Post, 'findOneAndUpdate');
        mockPost.mockReturnValue(fakePost);

        const answer = await removeUserIdFromPost('postId', 'userId', fakeNext);
    });
});
