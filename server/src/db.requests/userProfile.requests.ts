import { User, IUserModel } from '../models/user.model';
import { Request, NextFunction } from 'express';

export const findById = async (id: string, next: NextFunction): Promise<IUserModel | void | null> => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('There is no user with this id.');
        }
        return user;
    } catch (e) {
        next(e);
    }
};

export const handlePhotoChange = async (req: Request): Promise<any> => {
    const user: any = await User.findOneAndUpdate(
        { _id: req.body.id },
        { photoPath: req.file ? req.file.location : '' },
    );
    const result = {
        newPhoto: req.file ? req.file.location : '',
        previousPhoto: user.photoPath.split('/').pop(),
    };
    return result;
};
