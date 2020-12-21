import { deletePost } from '../deletePost.request';

import mockingoose from 'mockingoose';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Delete post tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('deletePost test', async () => {
        mockingoose(Post).toReturn(null, 'findOneAndRemove');
        const fakeDeletedUser = Post.findOneAndRemove();

        const mockRemoveUser = jest.spyOn(Post, 'findOneAndRemove');
        mockRemoveUser.mockReturnValue(fakeDeletedUser);

        const answer = await deletePost('sometoken', 'userId', false, fakeNext);
    });
});
