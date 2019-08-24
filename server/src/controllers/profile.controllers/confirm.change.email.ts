import {NextFunction, Request, Response} from 'express';
import {decodeJWT} from '../../helpers/jwt.encoders';
import {IUserModel, User} from '../../models/user.model';

export const confirmChangeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { oldEmail, email, token }: {oldEmail: string, email: string, token: string} = req.params;

        const checkToken: any = decodeJWT(token, process.env.SECRET_KEY!);

        const updatedUser = await User.findOne({email: oldEmail});
        if (updatedUser) {
            updatedUser.email = email;
            await updatedUser.save();
        }

        res.redirect(`${process.env.FRONT_PATH}/logout`);
    } catch (e) {
        next({message: 'User has not been authenticated', status: 409});
    }
};
