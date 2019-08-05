import mongoose, {Schema, Document, Model, model} from 'mongoose';
import {IPost} from "./post.model";

export interface IUserModel extends Document {
    login: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    dateOfBirth?: string,
    createdAt: Date,
    photoPath?: string,
    bio?: string,
    isAdmin: boolean,
    posts?: IPost['_id']
}

const UserSchema: Schema = new Schema({
    login: {type: String, required: true, unique: true, minlength: 3, maxlength: 20},
    email: {type: String, required: true, unique: true, minlength: 3, maxlength: 40},
    firstName: {type: String, required: true, minlength: 3, maxlength: 40},
    lastName: {type: String, required: true, minlength: 3, maxlength: 40},
    password: {type: String, required: true, minlength: 6, maxlength: 50},
    dateOfBirth: {type: Date},
    createdAt: {type: Date, default: Date.now, required: true},
    photoPath: {type: String},
    bio: {type: String, minlength: 4, maxlength: 200},
    isAdmin: {type: Boolean, default: false, required: true},
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
