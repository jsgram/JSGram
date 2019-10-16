import { update } from '../update.comments.controller';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import * as commentRequests from '../../../db.requests/update.comment.request';
import { Comment, ICommentModel } from '../../../models/comment.model';
import { updateComment } from '../../../db.requests/update.comment.request';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Update comment controller:', () => {
    test('update comment - success', async () => {
        mockingoose(Comment).toReturn({}, 'findOne');
        const fakeComment: ICommentModel = await Comment.findOne({}) as ICommentModel;

        const mockUpdatedComment = jest.spyOn(commentRequests, 'updateComment');
        const answer = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockUpdatedComment.mockReturnValue(answer);

        request.params = {
            id: 'some id',
        };
        request.body = {
            comment: 'some comment',
            email: 'some email',
        };

        response.locals = {
            user: {
                email: 'some email',
                isAdmin: true,
            },
        };
        response.json = jest.fn(() => response);

        await update(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
    test('update comment - failure', async () => {
        const mockUpdatedComment = jest.spyOn(commentRequests, 'updateComment');
        mockUpdatedComment.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
        request.params = {
            id: '',
        };
        request.body = {
            comment: '',
            email: '',
        };

        response.locals = {
            user: {
                email: '',
                isAdmin: true,
            },
        };

        const answer = {
            message: 'Error updating comment',
            status: 500,
        };

        await update(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
