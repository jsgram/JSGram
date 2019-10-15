import { findTags } from '../search.by.tag.request';

import mockingoose from 'mockingoose';
import { Tag } from '../../models/tag.model';

type IFakeNext = () => void;

describe('Search by tag tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('findTags test', async () => {
        mockingoose(Tag).toReturn(null, 'find');
        const fakeTag = Tag.find();

        const mockTag = jest.spyOn(Tag, 'find');
        mockTag.mockReturnValue(fakeTag);

        const answer = await findTags('someQuery', 3, fakeNext);
    });
});
