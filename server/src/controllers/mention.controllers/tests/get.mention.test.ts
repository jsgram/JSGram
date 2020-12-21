import { getMention } from '../get.mention';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as mentionRequests from '../../../db.requests/get.mention';
import { Post, IPostModel} from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get mention controller:', () => {
    test('get mention - success', async () => {
        mockingoose(Post).toReturn({}, 'findOne');
        const fakeMention: IPostModel = await Post.findOne({}) as IPostModel;

        const mockCreateComment = jest.spyOn(mentionRequests, 'findMention');
        const answer = new Promise((res: IResolve<IPostModel>): void => res(fakeMention));
        mockCreateComment.mockReturnValue(answer);

        request.params = {
            page: 1,
        };

        response.locals = {
            user: {
                username: 'some username',
            },
        };
        response.json = jest.fn(() => response);

        await getMention(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
