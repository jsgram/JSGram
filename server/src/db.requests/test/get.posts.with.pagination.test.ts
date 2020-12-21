import { getPostsWithPagination } from '../get.posts.with.pagination';

import mockingoose from 'mockingoose';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('getPosts with pagination tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('getPosts with pagination test', async () => {
        mockingoose(Post).toReturn(null, 'find');
        const fakePost = Post.find();

        const mockPost = jest.spyOn(Post, 'find');
        mockPost.mockReturnValue(fakePost);

        const answer = await getPostsWithPagination([], 3, fakeNext);
    });
});
