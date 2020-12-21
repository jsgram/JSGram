import { User } from '../models/user.model';
import { Request } from 'express';

export const handlePhotoChange = async (req: Request, id: string): Promise<any> => {
    const user: any = await User.findOneAndUpdate(
        { _id: id },
        { photoPath: req.file ? req.file.location : '' },
    );
    const result = {
        newPhoto: req.file ? req.file.location : '',
        previousPhoto: user.photoPath.split('/').pop(),
    };
    return result;
};
