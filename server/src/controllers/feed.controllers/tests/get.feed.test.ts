import { getFeed } from '../get.feed';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as getRequests from '../../../db.requests/getFeed.requests';
import { Post } from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get feed controller:', () => {
    test('get feed - success', async () => {
        mockingoose(Post).toReturn({}, 'findOne');
        const fakeFeed: object[] = await Post.find({}) as object[];

        const mockCountLike = jest.spyOn(getRequests, 'getPostsForFeed');
        const answer = new Promise((res: IResolve<object[]>): void => res(fakeFeed));
        mockCountLike.mockReturnValue(answer);

        request.params = {
            page: 1,
        };

        response.locals = {
            user: {
                following: 'some following',
                _id: 'some id',
            },
        };
        response.json = jest.fn(() => response);

        await getFeed(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
