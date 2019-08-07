import {Router} from 'express';
import passport from 'passport';

import {register} from '../controllers/auth.controllers/register';
import {login} from '../controllers/auth.controllers/login';
import {encodeJWT} from '../helpers/jwt.encoders';

const authRouter = Router();

authRouter.post('/register',
    register,
    passport.authenticate('register'),
    (req, res) => {
        const token = encodeJWT(req.user.username, process.env.SECRET_KEY!);

        res.set('Set-Cookie', 'session=' + token);
        res.status(201).json({
            meta: {},
            data: {
                email: req.user.email,
                fullName: req.user.fullName,
                username: req.user.username,
                dateOfBirth: req.user.dateOfBirth,
                createdAt: req.user.createdAt,
                photoPath: req.user.photoPath,
                bio: req.user.bio,
                isAdmin: req.user.isAdmin,
                posts: req.user.posts,
            },
            errors: [],
        });
    },
);

authRouter.post('/login', login);
authRouter.get('/error', (req, res) => res.send('error'));
authRouter.get('/', (req, res) => res.send('good'));
export {authRouter};
