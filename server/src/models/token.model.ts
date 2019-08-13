import {Schema, Document, Model, model} from 'mongoose';
import {IUserModel} from './user.model';

export interface ITokenModel extends Document {
    user: IUserModel;
    token: string;
    createdAt: Date;
}

const TokenSchema: Schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: process.env.EXPIRES, required: true},
});

export const Token: Model<ITokenModel> =
    model<ITokenModel>('Token', TokenSchema);
