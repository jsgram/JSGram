import { Schema, Document, model } from 'mongoose';

export interface IPostModel extends Document {
    author: string;
    imgPath: string;
    description?: string;
    comments?: any[];
    tags?: string[];
    likes?: any[];
    createdAt: Date;
}

const PostSchema: Schema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    imgPath: {type: String, required: true},
    description: {type: String, default: '', maxlength: 1000},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    tags: [{type: String}],
    likes: [{type: Schema.Types.ObjectId, ref: 'Like'}],
    createdAt: {type: Date, default: Date.now, required: true},
});

export const Post = model<IPostModel>('Post', PostSchema);
