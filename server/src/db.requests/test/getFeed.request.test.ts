import { getPostsForFeed } from '../getFeed.requests';

import mockingoose from 'mockingoose';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Get Feed request tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('Get Feed request test', async () => {
        mockingoose(Post).toReturn(null, 'find');
        const fakePost = Post.find();

        const mockPost = jest.spyOn(Post, 'find');
        mockPost.mockReturnValue(fakePost);

        const answer = await getPostsForFeed([], 3, 9);
    });
});
