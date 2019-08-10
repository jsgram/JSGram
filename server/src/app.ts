import {config} from 'dotenv';
import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import passport from 'passport';

import connect from './connect';
import './helpers/passport.config';

import {postRouter} from './routes/post.router';
import {userRouter} from './routes/user.router';
import {authRouter} from './routes/auth.router';
import {confirmUserRouter} from './routes/confirm.user.router';
import {forgotPassword} from './routes/forgot.password';

import {unknownPageHandler} from './helpers/unknown.page.handler';
import {errorHandler} from './helpers/error.handler';
import {requestLoggerMiddleware} from './helpers/request.logger.middleware';

config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(requestLoggerMiddleware);

app.get('/favicon.ico', (req: Request, res: Response) => res.status(204));
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/confirm', confirmUserRouter);
app.use('/forgot-password', forgotPassword);

app.use('*', unknownPageHandler);
app.use(errorHandler);

app.listen(process.env.DEV_PORT, () => console.info('Listening...'));

const DB_PATH = process.env.DB_PATH!; // FIXME type
connect({DB_PATH});
