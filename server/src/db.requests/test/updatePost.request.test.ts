import { updatePost } from '../updatePost.request';

import mockingoose from 'mockingoose';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Update post request tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('updatePost test', async () => {
        mockingoose(Post).toReturn(null, 'findOneAndUpdate');
        const fakePost = Post.findOneAndUpdate();

        const mockPost = jest.spyOn(Post, 'findOneAndUpdate');
        mockPost.mockReturnValue(fakePost);

        const answer = await updatePost(
            'commentId',
            'description',
            [],
            'userId',
            false,
            fakeNext);
    });
});
