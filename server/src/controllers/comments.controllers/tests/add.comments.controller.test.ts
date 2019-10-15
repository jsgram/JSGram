import { addComments } from '../add.comments.controller';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as commentRequests from '../../../db.requests/add.comments.requests';
import { Comment, ICommentModel } from '../../../models/comment.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Add comment controller:', () => {
    test('add comment - success', async () => {
        mockingoose(Comment).toReturn({}, 'findOne');
        const fakeComment: ICommentModel = await Comment.findOne({}) as ICommentModel;

        const mockCreateComment = jest.spyOn(commentRequests, 'createComment');
        const answer = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockCreateComment.mockReturnValue(answer);

        request.body = {
            postId: 'some post id',
            authorId: 'some author id',
            comment: 'some comment',
        };
        response.json = jest.fn(() => response);

        await addComments(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });
    test('add comment - failure', async () => {
        request.body = {
            postId: '',
            authorId: '',
            comment: '',
        };

        const answer = {
            message: 'Can not create comment',
            status: 409,
        };

        await addComments(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
