import { addLike } from '../add.like';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as likeRequests from '../../../db.requests/add.like.requests';
import { Like, ILikeModel } from '../../../models/like.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Add like controller:', () => {
    test('add like - success', async () => {
        mockingoose(Like).toReturn({}, 'findOne');
        const fakeLike: ILikeModel = await Like.findOne({}) as ILikeModel;

        const mockCountLike = jest.spyOn(likeRequests, 'countLike');
        const input = new Promise((res: IResolve<ILikeModel>): void => res(fakeLike));
        mockCountLike.mockReturnValue(input);

        const mockCreateLike = jest.spyOn(likeRequests, 'createLike');
        const answer = new Promise((res: IResolve<ILikeModel>): void => res(fakeLike));
        mockCreateLike.mockReturnValue(answer);

        request.body = {
            postId: 'some post id',
            userId: 'some user id',
        };
        response.json = jest.fn(() => response);

        await addLike(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('add like - failure', async () => {
        request.body = {
            postId: '',
            userId: '',
        };

        const answer = {
            message: 'No postId or username',
            status: 409,
        };

        await addLike(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
