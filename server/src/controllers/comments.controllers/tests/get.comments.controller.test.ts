import { getPostComments } from '../get.comments.controller';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as commentRequests from '../../../db.requests/get.comments.with.pagination';
import { Comment, ICommentModel } from '../../../models/comment.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get comments controller', () => {
    test('get comment - success', async () => {
        mockingoose(Comment).toReturn({}, 'findOne');
        const fakeComment: ICommentModel[] = await Comment.find({}) as ICommentModel[];

        const mockComment = jest.spyOn(commentRequests, 'getCommentsWithPagination');
        const answer = new Promise((res: IResolve<ICommentModel[]>): void => res(fakeComment));
        mockComment.mockReturnValue(answer);

        request.params = {
            postId: 'some id',
            page: 1,
        };

        response.json = jest.fn(() => response);

        await getPostComments(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
