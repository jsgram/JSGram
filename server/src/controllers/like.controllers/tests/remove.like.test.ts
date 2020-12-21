import { removeLike } from '../remove.like';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as likeRequests from '../../../db.requests/remove.like.requsets';
import { Like, ILikeModel } from '../../../models/like.model';
import { Post, IPostModel } from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Remove like controller:', () => {
    test('remove like - success', async () => {
        mockingoose(Like).toReturn({}, 'findOne');
        const fakeLike: ILikeModel = await Like.findOne({}) as ILikeModel;

        mockingoose(Post).toReturn({}, 'findOne');
        const fakePost: IPostModel = await Post.findOne({}) as IPostModel;

        const mockRemoveLike = jest.spyOn(likeRequests, 'deleteLike');
        const input = new Promise((res: IResolve<ILikeModel>): void => res(fakeLike));
        mockRemoveLike.mockReturnValue(input);

        const mockRemoveUserId = jest.spyOn(likeRequests, 'removeUserIdFromPost');
        const answer = new Promise((res: IResolve<IPostModel>): void => res(fakePost));
        mockRemoveUserId.mockReturnValue(answer);

        request.params = {
            postId: 'some post id',
        };

        request.body = {
            userId: 'some user id',
        };
        response.json = jest.fn(() => response);

        await removeLike(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('remove like - failure', async () => {
        const mockRemoveUserId = jest.spyOn(likeRequests, 'removeUserIdFromPost');
        mockRemoveUserId.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
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
