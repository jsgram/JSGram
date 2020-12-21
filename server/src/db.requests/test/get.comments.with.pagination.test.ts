import { getCommentsWithPagination } from '../get.comments.with.pagination';

import mockingoose from 'mockingoose';
import { Comment } from '../../models/comment.model';

type IFakeNext = () => void;

describe('getCommentsWithPagination tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('getCommentsWithPagination test', async () => {
        mockingoose(Comment).toReturn(null, 'find');
        const fakeComment = Comment.find();

        const mockComment = jest.spyOn(Comment, 'find');
        mockComment.mockReturnValue(fakeComment);

        const answer = await getCommentsWithPagination('sometoken', 3, fakeNext);
    });
});
