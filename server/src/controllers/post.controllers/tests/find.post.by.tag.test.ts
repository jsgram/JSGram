import { findByTagName } from '../find.post.by.tag';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as postRequests from '../../../db.requests/find.post.by.tag';
import { Tag, ITagModel} from '../../../models/tag.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Find post by tag controller:', () => {
    test('find post by tag - success', async () => {
        mockingoose(Tag).toReturn({}, 'findOne');
        const fakeTag: ITagModel = await Tag.findOne({}) as ITagModel;

        const mockByTagPost = jest.spyOn(postRequests, 'findPostByTag');
        const answer = new Promise((res: IResolve<ITagModel>): void => res(fakeTag));
        mockByTagPost.mockReturnValue(answer);

        request.params = {
            tagName: 'some tag name',
            page: 1,
        };

        response.json = jest.fn(() => response);

        await findByTagName(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
