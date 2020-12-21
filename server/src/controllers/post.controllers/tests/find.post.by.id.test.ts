import { findById } from '../find.post.by.id';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as postRequests from '../../../db.requests/find.post.by.id';
import { Post, IPostModel } from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Find post by id controller:', () => {
    test('find post by id - success', async () => {
        mockingoose(Post).toReturn({}, 'findOne');
        const fakePost: IPostModel = await Post.findOne({}) as IPostModel;

        const mockByIdPost = jest.spyOn(postRequests, 'findPostById');
        const answer = new Promise((res: IResolve<IPostModel>): void => res(fakePost));
        mockByIdPost.mockReturnValue(answer);

        request.params = {
            id: 'some id',
        };

        response.json = jest.fn(() => response);

        await findById(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
