import { deleteComments } from '../delete.comments.controller';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as commentRequests from '../../../db.requests/delete.comments.requests';
import { Comment, ICommentModel } from '../../../models/comment.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Delete comments controller', () => {
    test('delete comment - success', async () => {
        mockingoose(Comment).toReturn({}, 'findOne');
        const fakeComment: ICommentModel = await Comment.findOne({}) as ICommentModel;

        const mockDeletedComment = jest.spyOn(commentRequests, 'deleteComment');
        const input = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockDeletedComment.mockReturnValue(input);

        const mockUpdatedPost = jest.spyOn(commentRequests, 'deleteCommentFromPost');
        const answer = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockUpdatedPost.mockReturnValue(answer);

        request.params = {
            id: 'some id',
        };

        request.body = {
            authorId: 'some author id',
        };

        response.locals = {
            user: {
                id: 'some id',
                isAdmin: true,
            },
        };

        response.json = jest.fn(() => response);

        await deleteComments(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('delete comments - failure', async () => {
        const mockUpdatedPost = jest.spyOn(commentRequests, 'deleteCommentFromPost');
        mockUpdatedPost.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
        request.params = {
            id: '',
        };

        request.body = {
            authorId: '',
        };

        response.locals = {
            user: {
                id: '',
                isAdmin: true,
            },
        };

        const answer = {
            message: 'Cannot delete comment  from post undefined.',
            status: 500,
        };

        await deleteComments(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
