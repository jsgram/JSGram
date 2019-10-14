import { getLikes } from '../get.likes';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as likeRequests from '../../../db.requests/get.likes';
import { Like, ILikeModel } from '../../../models/like.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */
});

describe('Get like controller:', () => {
    test('get like - success', async () => {
        mockingoose(Like).toReturn({}, 'findOne');
        const fakeLike: object[] = await Like.find({}) as object[];

        const mockLike = jest.spyOn(likeRequests, 'getLikedPosts');
        const value1 = new Promise((res: IResolve<object[]>): void => res(fakeLike));
        mockLike.mockReturnValue(value1);

        request.params = {
            page: 1,
        };
        response.json = jest.fn(() => response);

        await getLikes(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });
});
