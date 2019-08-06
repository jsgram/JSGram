import {NextFunction, Request, Response} from 'express';
import {IUserModel, User} from '../../models/user.model';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {
            email,
            fullName,
            username,
            password,
            dateOfBirth,
            createdAt,
            photoPath,
            bio,
            isAdmin,
            posts}: IUserModel = req.body;

        if(!email || !fullName || !username || !password)
            throw new Error('Some field is empty');

        const createdUser: IUserModel = await User.create({
            email,
            fullName,
            username,
            password,
            dateOfBirth,
            createdAt,
            photoPath,
            bio,
            isAdmin,
            posts
        });

        res.json(createdUser);

    }catch (e) {
        next(e);
    }
};
