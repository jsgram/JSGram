import { Schema, Document, model } from 'mongoose';
import { IPostModel } from './post.model';

export interface ITagModel extends Document {
    tagName: string;
    posts?: IPostModel['_id'];
}

const TagSchema: Schema = new Schema({
    tagName: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
});

export const Tag = model<ITagModel>('Tag', TagSchema);
