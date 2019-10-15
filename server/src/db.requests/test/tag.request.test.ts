import { createTag, deleteTags } from '../tag.requests';

import mockingoose from 'mockingoose';
import { Tag } from '../../models/tag.model';

type IFakeNext = () => void;

describe('Tag request tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('createTag test', async () => {
        mockingoose(Tag).toReturn(null, 'findOneAndUpdate');
        const fakeTag = Tag.findOneAndUpdate();

        const mockTag = jest.spyOn(Tag, 'findOneAndUpdate');
        mockTag.mockReturnValue(fakeTag);

        const answer = await createTag('tag', 'postId', fakeNext);
    });

    test('deleteTags test', async () => {
        mockingoose(Tag).toReturn(null, 'deleteOne');
        const fakeTag = Tag.deleteOne({});

        const mockTag = jest.spyOn(Tag, 'deleteOne');
        mockTag.mockReturnValue(fakeTag);

        const answer = await deleteTags('postId', fakeNext);
    });
});
