import mongoose, {Schema, Document} from 'mongoose';

export interface IPost extends Document {
    imgPath: string,
    description?: string,
    createdAt: Date
}

const PostSchema: Schema = new Schema({
    imgPath: {type: String, required: true},
    description: {type: String, minlength: 10, maxlength: 1000},
    createdAt: {type: Date, default: Date.now, required: true}
});

export default mongoose.model<IPost>('Post', PostSchema);
