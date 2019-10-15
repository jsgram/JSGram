import { updateComment } from '../update.comment.request';

import mockingoose from 'mockingoose';
import { Comment } from '../../models/comment.model';

type IFakeNext = () => void;

describe('Update comment request tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('updateComment test', async () => {
        mockingoose(Comment).toReturn(null, 'findOneAndUpdate');
        const fakeComment = Comment.findOneAndUpdate();

        const mockComment = jest.spyOn(Comment, 'findOneAndUpdate');
        mockComment.mockReturnValue(fakeComment);

        const answer = await updateComment('commentId', 'comment', fakeNext);
    });
});
