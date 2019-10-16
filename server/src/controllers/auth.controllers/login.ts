import {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import {encodeJWT} from '../../helpers/jwt.encoders';
import {IUserModel} from '../../models/user.model';
import {userExist} from '../../db.requests/user.requests';
import { serverError } from '../../common.constants/errors.constants';
import {isCorrectPassword} from '../../helpers/hash.password';

export const login = async (req: Request, res: Response, next: NextFunction,
): Promise<void> => {
    try {
        const checkUser = await userExist(req.body.email, next);
        if (!checkUser) {
            const message = 'User does not exist';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const verifiedPassword  = await isCorrectPassword(req.body.password, (checkUser as IUserModel).password);
        if (!verifiedPassword ) {
            const message = 'Wrong password';

            console.warn(new Error(message));
            next({ message, status: 401 });
        }

        if (!(checkUser as IUserModel).isVerified) {
            const message = 'User has not been authenticated';

            console.warn(new Error(message));
            next({ message, status: 401 });
        }

        passport.authenticate('local', function(err: Error, user: IUserModel): any {
            if (err) {
                return next(err);
            }

            req.logIn(user, function(error: Error): any {
                if (error) {
                    return next(error);
                }

                const token = encodeJWT(req.body.email, process.env.SECRET_KEY);
                return res.json({token});
            });
        })(req, res, next);
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
