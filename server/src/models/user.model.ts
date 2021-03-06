import { Schema, Document, Model, model } from 'mongoose';
import { IPostModel, Post } from './post.model';

export interface IUserSubscriptions {
    isNewsEmail: boolean;
    isReminderEmail: boolean;
    isProductEmail: boolean;
    isResearchEmail: boolean;
    isTextMessage: boolean;
}

export interface IUserPrivacy {
    isPrivateAccount: boolean;
    isActivityStatus: boolean;
    isStorySharing: boolean;
}

export interface IUserModel extends Document {
    email: string;
    fullName: string;
    username: string;
    password: string;
    createdAt: Date;
    photoPath?: string;
    bio?: string;
    isAdmin: boolean;
    isVerified: boolean;
    subscriptions?: IUserSubscriptions;
    privacy?: IUserPrivacy;
    followers?: IUserModel['_id'];
    following: IUserModel['_id'];
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
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150,
    },
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
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    bio: {
        type: String,
        default: '',
        maxlength: 200,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
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
    subscriptions: {
        isNewsEmail: {
            type: Boolean,
            default: false,
        },
        isReminderEmail: {
            type: Boolean,
            default: false,
        },
        isProductEmail: {
            type: Boolean,
            default: false,
        },
    },
    privacy: {
        isPrivateAccount: {
            type: Boolean,
            default: false,
        },
        isActivityStatus: {
            type: Boolean,
            default: true,
        },
        isStorySharing: {
            type: Boolean,
            default: true,
        },
    },
    posts: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Post',
        required: true,
    }],
    photoPath: {
        type: String,
        default: '',
        required: false,
    },
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
