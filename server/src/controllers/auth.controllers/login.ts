import {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import {encodeJWT} from '../../helpers/jwt.encoders';
import {IUserModel} from '../../models/user.model';
import {userExist} from '../../db.requests/user.requests';
import {isCorrectPassword} from '../../helpers/hash.password';

export const login = async (req: Request, res: Response, next: NextFunction,
): Promise<void> => {
    try {
        const checkUser = await userExist(req.body.email, next);
        if (!checkUser) {
            throw new Error('User does not exist');
        }

        const verifiedPassword  = await isCorrectPassword(req.body.password, checkUser.password);
        if (!verifiedPassword ) {
            throw new Error('Wrong password');
        }

        if (!checkUser.isVerified) {
            throw new Error('User has not been authenticated');
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
        next({message: e.message, status: 406});
    }
};
