import { Schema, Document, Model, model } from 'mongoose';
import { IPostModel } from './post.model';
import { IUserModel } from './user.model';

export interface ICommentModel extends Document {
    postId: IPostModel['_id'];
    authorId: IUserModel['_id'];
    comment: string;
}

const CommentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        minlength: 1,
        maxlength: 200,
        required: true,
    },
});

export const Comment: Model<ICommentModel> = model<ICommentModel>('Comment', CommentSchema);
