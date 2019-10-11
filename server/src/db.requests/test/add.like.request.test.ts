import { countLike, addUserIdToPost } from '../add.like.requests';

import mockingoose from 'mockingoose';
import { Like } from '../../models/like.model';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Add like tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('countLike test', async () => {
        mockingoose(Like).toReturn(null, 'countDocuments');
        const fakeLikeNumber = Like.countDocuments({});

        const mockLikeNumber = jest.spyOn(Like, 'countDocuments');
        mockLikeNumber.mockReturnValue(fakeLikeNumber);

        const answer = await countLike('sometoken', 'fakeUserId', fakeNext);
    });

    test('addUserIdToPost test', async () => {
        mockingoose(Post).toReturn(null, 'findOneAndUpdate');
        const fakePost = Post.findOneAndUpdate();

        const mockUserToPost = jest.spyOn(Post, 'findOneAndUpdate');
        mockUserToPost.mockReturnValue(fakePost);

        const answer = await addUserIdToPost('somePostId', 'fakeUserId', fakeNext);
    });

});
