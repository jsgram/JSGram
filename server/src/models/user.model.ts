import {Schema, Document, Model, model} from 'mongoose';
import {IPost} from './post.model';

export interface IUserModel extends Document {
    email: string;
    fullName: string;
    username: string;
    password: string;
    dateOfBirth?: string;
    createdAt: Date;
    photoPath?: string;
    bio?: string;
    isAdmin: boolean;
    isVerified: boolean;
    posts?: IPost['_id'];
}

const UserSchema: Schema = new Schema({
    email: {
        type: String, required: true,
        unique: true, minlength: 3,
        maxlength: 40,
    },
    fullName: {type: String, required: true, minlength: 3, maxlength: 150},
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 40,
    },
    password: {
        type: String,
        required: true,
        match: /^[\w\$/.]{60}$/,
    },
    dateOfBirth: {type: Date},
    createdAt: {type: Date, default: Date.now, required: true},
    bio: {type: String, minlength: 4, maxlength: 200},
    isAdmin: {type: Boolean, default: false, required: true},
    isVerified: {type: Boolean, default: false, required: true},
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    photoPath: {type: String, default: '', required: false},
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
