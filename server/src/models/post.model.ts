import { Schema, Document, model } from 'mongoose';
import { IUserModel } from './user.model';
import { ICommentModel } from './comment.model';

export interface IPostModel extends Document {
    author: IUserModel['_id'];
    imgPath: string;
    description?: string;
    comments?: ICommentModel['_id'];
    authorsOfLike?: IUserModel['_id'];
    createdAt: Date;
}

const PostSchema: Schema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    imgPath: {type: String, required: true},
    description: {type: String, default: '', maxlength: 1000},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    authorsOfLike: [{type: Schema.Types.ObjectId, default: [], ref: 'User', required: true}],
    createdAt: {type: Date, default: Date.now, required: true},
});

export const Post = model<IPostModel>('Post', PostSchema);
