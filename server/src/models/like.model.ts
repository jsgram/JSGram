import { Schema, Document, model } from 'mongoose';

export interface ILikeModel extends Document {
    postId: string;
    userId: string;
    createdAt: Date;
}

const LikeSchema: Schema = new Schema({
    postId: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now, required: true},
});

export const Like = model<ILikeModel>('Like', LikeSchema);
