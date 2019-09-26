import { Schema, Document, Model, model } from 'mongoose';

export interface IServiceModel extends Document {
    shouldReload: boolean;
}

const ServiceSchema: Schema = new Schema({
    shouldReload: { type: Boolean, default: false },
});

export const Service: Model<IServiceModel> = model<IServiceModel>('Service', ServiceSchema);
