import { remove } from '../remove.post.by.id';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as postRequests from '../../../db.requests/deletePost.request';
import { Post, IPostModel } from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Delete post controller:', () => {
    test('delete post - success', async () => {
        mockingoose(Post).toReturn({}, 'findOne');
        const fakePost: IPostModel = await Post.findOne({}) as IPostModel;

        const mockDeletePost = jest.spyOn(postRequests, 'deletePost');
        const answer = new Promise((res: IResolve<IPostModel>): void => res(fakePost));
        mockDeletePost.mockReturnValue(answer);

        request.params = {
            id: 'some id',
            body: 'some body',
        };

        response.locals = {
            user: {
                id: {
                    userId: 'some user id',
                    isAdmin: true,
                },
            },
        };
        response.json = jest.fn(() => response);

        await remove(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('delete post - failure', async () => {
        request.params = {
            id: '',
            body: '',
        };

        const answer = {
            message: 'Couldn\'t delete post',
            status: 500,
        };

        await remove(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
