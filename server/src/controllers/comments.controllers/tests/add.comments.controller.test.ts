import { addComments } from '../add.comments.controller';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as commentRequests from '../../../db.requests/add.comments.requests';
import { Comment, ICommentModel } from '../../../models/comment.model';
import { Post, IPostModel} from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Add comment controller:', () => {
    test('add comment - success', async () => {
        mockingoose(Comment).toReturn({}, 'findOne');
        const fakeComment: ICommentModel = await Comment.findOne({}) as ICommentModel;

        mockingoose(Post).toReturn({}, 'findOne');
        const fakeCommentId: IPostModel = await Post.findOne({}) as IPostModel;

        const mockCreateComment = jest.spyOn(commentRequests, 'createComment');
        const input = new Promise((res: IResolve<ICommentModel>): void => res(fakeComment));
        mockCreateComment.mockReturnValue(input);

        const mockAddCommentIdToPost = jest.spyOn(commentRequests, 'addCommentIdToPost');
        const answer = new Promise((res: IResolve<IPostModel>): void => res(fakeCommentId));
        mockAddCommentIdToPost.mockReturnValue(answer);

        request.body = {
            postId: 'some post id',
            authorId: 'some author id',
            comment: 'some comment',
        };
        response.json = jest.fn(() => response);

        await addComments(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
    test('add comment - failure', async () => {
        const mockAddCommentIdToPost = jest.spyOn(commentRequests, 'addCommentIdToPost');
        mockAddCommentIdToPost.mockReturnValue(new Promise((res: IResolve<null>): void => res(null)));
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
