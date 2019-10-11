import { findPostById } from '../find.post.by.id';

import mockingoose from 'mockingoose';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Find post by id tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('find post by id test', async () => {
        mockingoose(Post).toReturn(null, 'find');
        const fakePost = Post.find();

        const mockPost = jest.spyOn(Post, 'find');
        mockPost.mockReturnValue(fakePost);

        const answer = await findPostById('sometoken', fakeNext);
    });
});
