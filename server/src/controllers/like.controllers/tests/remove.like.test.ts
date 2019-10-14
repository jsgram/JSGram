import { removeLike } from '../remove.like';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as likeRequests from '../../../db.requests/remove.like.requsets';
import { Like, ILikeModel } from '../../../models/like.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */
});

describe('Remove like controller:', () => {
    test('remove like - success', async () => {
        mockingoose(Like).toReturn({}, 'findOne');
        const fakeLike: ILikeModel = await Like.findOne({}) as ILikeModel;

        const mockCountLike = jest.spyOn(likeRequests, 'deleteLike');
        const value1 = new Promise((res: IResolve<ILikeModel>): void => res(fakeLike));
        mockCountLike.mockReturnValue(value1);

        request.params = {
            postId: 'some post id',
        };

        request.body = {
            userId: 'some user id',
        };
        response.json = jest.fn(() => response);

        await removeLike(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('remove like - failure', async () => {
        request.params = {
            postId: '',
        };

        request.body = {
            userId: '',
        };

        const answer = {
            message: 'Can not remove like from post',
            status: 409,
        };

        await removeLike(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
