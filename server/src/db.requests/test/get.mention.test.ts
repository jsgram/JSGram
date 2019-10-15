import { findMention } from '../get.mention';

import mockingoose from 'mockingoose';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Get mention tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('findMention test', async () => {
        mockingoose(Post).toReturn(null, 'find');
        const fakePost = Post.find();

        const mockPost = jest.spyOn(Post, 'find');
        mockPost.mockReturnValue(fakePost);

        const answer = await findMention('username', 3, fakeNext);
    });
});
