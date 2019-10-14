import { deleteComments } from '../delete.comments.controller';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as commentRequests from '../../../db.requests/delete.comments.requests';
import { Comment, ICommentModel } from '../../../models/comment.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */
});

describe('Delete comments controller', () => {
    test('delete comment - success', async () => {
        mockingoose(Comment).toReturn({}, 'findOne');
        const fakeComment: ICommentModel = await Comment.findOne({}) as ICommentModel;

        const mockDeletedComment = jest.spyOn(commentRequests, 'deleteComment');
        const value1 = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockDeletedComment.mockReturnValue(value1);

        const mockUpdatedPost = jest.spyOn(commentRequests, 'deleteCommentFromPost');
        const value2 = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockUpdatedPost.mockReturnValue(value2);

        request.params = {
            id: 'some id',
        };

        request.body = {
            authorId: 'some author id',
        };

        response.json = jest.fn(() => response);

        await deleteComments(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });

    test('delete comments - failure', async () => {
        request.params = {
            id: '',
        };

        request.body = {
            authorId: '',
        };

        const answer = {
            message: 'Cannot destructure property `user` of \'undefined\' or \'null\'.',
            status: 409,
        };

        await deleteComments(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
