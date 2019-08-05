import {NextFunction, Request, Response} from "express";
import {IUserModel, User} from "../../models/user.model";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {
            login,
            email,
            firstName,
            lastName,
            password,
            dateOfBirth,
            createdAt,
            photoPath,
            bio,
            isAdmin,
            posts}: IUserModel = req.body;

        if(!login || !email || !firstName || !lastName || !password)
            throw new Error('Some field is empty');

        const createdUser: IUserModel = await User.create({
            login,
            email,
            firstName,
            lastName,
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
