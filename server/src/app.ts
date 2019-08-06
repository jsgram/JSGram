import { config } from 'dotenv';
import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import passport from 'passport';

import connect from './connect';
import './helpers/passport.config';

import {requestLoggerMiddleware} from './helpers/request.logger.middleware';

import {postRouter} from './routes/post.router';
import {userRouter} from './routes/user.router';
import {authRouter} from './routes/auth.router';

import {unknownPageHandler} from './helpers/unknown.page.handler';

config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(requestLoggerMiddleware);

app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use('*', unknownPageHandler);

app.listen(process.env.DEV_PORT, () => console.log('Listening...'));

const db_path = process.env.DB_PATH!; // FIXME type
connect({db_path});
