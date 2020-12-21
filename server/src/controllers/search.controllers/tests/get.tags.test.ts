import { getTags } from '../get.tags';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as searchRequests from '../../../db.requests/search.by.tag.request';
import { Tag, ITagModel } from '../../../models/tag.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get tag controller:', () => {
    test('get tag - success', async () => {
        mockingoose(Tag).toReturn({}, 'findOne');
        const fakeTag: ITagModel = await Tag.findOne({}) as ITagModel;

        const mockTag = jest.spyOn(searchRequests, 'findTags');
        const answer = new Promise((res: IResolve<ITagModel>): void => res(fakeTag));
        mockTag.mockReturnValue(answer);

        request.params = {
            query: 'some query',
            page: 1,
        };
        response.json = jest.fn(() => response);

        await getTags(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});
