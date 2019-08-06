import {Request, Response, NextFunction} from 'express';
import {User} from "../../models/user.model";
import {IUserModel} from "../../models/user.model";

interface IFindAll extends IUserModel{
    errorText: string
}

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.json( await User.find({}));
    } catch (e) {
        next(e);
    }
};
