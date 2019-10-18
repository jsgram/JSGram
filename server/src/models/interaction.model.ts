import { Schema, Document, model } from 'mongoose';
import { IUserModel } from './user.model';

interface IClient {
    innerHeight: number;
    innerWidth: number;
    name: string;
    outerHeight: number;
    outerWidth: number;
}

interface ICoordinates {
    x: number;
    y: number;
}

interface IInteraction {
    clientPosition: ICoordinates;
    content: string;
    createdAt: Date;
    event: string;
    screenPosition: ICoordinates;
    targetClasses: string;
    targetTag: string;
    type: string;
}

export interface IInteractionModel extends Document {
    userId: IUserModel['_id'];
    ipAddress: string;
    clientEnd: IClient;
    clientStart: IClient;
    interactions: [IInteraction];
    conversions: [IInteraction];
    language: string;
    page: {
        href: string;
        location: string;
        origin: string;
        title: string;
    };
    platform: string;
    loadTime: Date;
    unloadTime: Date;
}

const InteractionSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ipAddress: {
        type: String,
        required: true,
    },
    clientEnd: {
        innerHeight: Number,
        innerWidth: Number,
        name: String,
        outerHeight: Number,
        outerWidth: Number,
    },
    clientStart: {
        innerHeight: Number,
        innerWidth: Number,
        name: String,
        outerHeight: Number,
        outerWidth: Number,
    },
    interactions: [{}],
    conversions: [{}],
    language: {
        type: String,
        required: true,
    },
    page: {
        href: { type: String, required: true },
        location: { type: String, required: true },
        origin: { type: String, required: true },
        title: { type: String, required: true },
    },
    platform: {
        type: String,
        maxlength: 64,
    },
    loadTime: Date,
    unloadTime: Date,
});

export const Interaction = model<IInteractionModel>('Interaction', InteractionSchema);
