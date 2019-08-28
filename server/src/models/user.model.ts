import { Schema, Document, Model, model } from 'mongoose';
import { IPostModel } from './post.model';

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
    followers?: IUserModel['_id'];
    following?: IUserModel['_id'];
    posts?: IPostModel['_id'];
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 40,
        required: true,
    },
    fullName: {type: String, required: true, minlength: 3, maxlength: 150},
    username: {
        type: String,
        minlength: 3,
        maxlength: 40,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        match: /^[\w\$/.]{60}$/,
        required: true,
    },
    dateOfBirth: {type: Date},
    createdAt: {type: Date, default: Date.now, required: true},
    photoPath: {type: String, default: '', required: false},
    bio: {type: String, default: '', maxlength: 200, required: true},
    isAdmin: {type: Boolean, default: false, required: true},
    isVerified: {type: Boolean, default: false, required: true},
    followers: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'User',
        required: true,
    }],
    following: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'User',
        required: true,
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Post',
        required: true,
    }],
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
