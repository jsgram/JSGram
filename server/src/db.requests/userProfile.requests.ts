import { User } from '../models/user.model';

export const handlePhotoChange = async (req: any): Promise<any> => {
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
