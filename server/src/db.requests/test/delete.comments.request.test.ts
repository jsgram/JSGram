import { deleteComment, deleteCommentFromPost } from '../delete.comments.requests';

import mockingoose from 'mockingoose';
import { Comment } from '../../models/comment.model';
import { Post } from '../../models/post.model';

type IFakeNext = () => void;

describe('Delete comments tests:', () => {
    let fakeNext: IFakeNext;

    beforeEach(() => {
        fakeNext = jest.fn(() => { /* */ });
    });

    test('deleteComment test', async () => {
        mockingoose(Comment).toReturn(null, 'findOneAndRemove');
        const fakeDeletedComment = Comment.findOneAndRemove();

        const mockRemoveComment = jest.spyOn(Comment, 'findOneAndRemove');
        mockRemoveComment.mockReturnValue(fakeDeletedComment);

        const answer = await deleteComment('sometoken', fakeNext);
    });

    test('deleteCommentFromPost test', async () => {
        mockingoose(Post).toReturn(null, 'findOneAndUpdate');
        const fakeDeletedComment = Post.findOneAndUpdate();

        const mockRemoveComment = jest.spyOn(Post, 'findOneAndUpdate');
        mockRemoveComment.mockReturnValue(fakeDeletedComment);

        const answer = await deleteCommentFromPost('postId', 'commentId', fakeNext);
    });

});
