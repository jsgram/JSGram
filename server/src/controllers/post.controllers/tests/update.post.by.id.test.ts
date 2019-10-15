import { update } from '../update.post.by.id';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as postRequests from '../../../db.requests/updatePost.request';
import { Post, IPostModel } from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Update post controller:', () => {
    test('update post - success', async () => {
        mockingoose(Post).toReturn({}, 'findOne');
        const fakePost: IPostModel = await Post.findOne({}) as IPostModel;

        const mockUpdatePost = jest.spyOn(postRequests, 'updatePost');
        const answer = new Promise((res: IResolve<IPostModel>): void => res(fakePost));
        mockUpdatePost.mockReturnValue(answer);

        request.params = {
            id: {
                postId: 'some post id',
            },
            body: {
                description: 'some description',
            },
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

        await update(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('update post - failure', async () => {
        request.params = {
            id: '',
            description: '',
        };

        const answer = {
            message: 'Can not update post',
            status: 500,
        };

        await update(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
