import { update } from '../update.comments.controller';
import {request, response} from 'express';
import mockingoose from 'mockingoose';
import * as commentRequests from '../../../db.requests/update.comment.request';
import { Comment, ICommentModel } from '../../../models/comment.model';
import { updateComment } from '../../../db.requests/update.comment.request';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */ });

describe('Update comment controller:', () => {
    test('update comment - success', async () => {
        mockingoose(Comment).toReturn({}, 'findOne');
        const fakeComment: ICommentModel = await Comment.findOne({}) as ICommentModel;

        const mockUpdatedComment = jest.spyOn(commentRequests, 'updateComment');
        const value1 = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockUpdatedComment.mockReturnValue(value1);

        request.params = {
            id: 'some id',
        };
        request.body = {
            comment: 'some comment',
            email: 'some email',
        };
        response.json = jest.fn(() => response);

        await update(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });
    test('update comment - failure', async () => {
        request.params = {
            id: '',
        };
        request.body = {
            comment: '',
            email: '',
        };

        const answer = {
            message: 'Cannot destructure property `user` of \'undefined\' or \'null\'.',
            status: 409,
        };

        await update(request, response, fakeNext);
        expect(fakeNext).toHaveBeenLastCalledWith(answer);
    });
});
