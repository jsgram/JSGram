import './helpers/globals';

import express, { Application, Request, Response } from 'express';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';

import './helpers/passport.config';

import { mainRouter } from './routes/main.routes/main.router';
import { feedRouter } from './routes/feed.routes/feed.router';
import { postRouter } from './routes/post.routes/post.router';
import { userRouter } from './routes/user.routes/user.router';
import { authRouter } from './routes/auth.routes/auth.router';
import { confirmUserRouter } from './routes/confirm.user.routes/confirm.user.router';
import { forgotPassword } from './routes/forgot.password.controllers/forgot.password';
import { googleRouter } from './routes/auth.routes/google.router';
import { profileRouter } from './routes/profile.routes/profile.router';
import { likesRouter } from './routes/likes.router/like.router';
import { subscribersRouter } from './routes/subscribers.routes/subscribers.router';
import { followingRouter } from './routes/following.routes/following.router';
import { commentsRouter } from './routes/comments.routes/comments.router';
import { searchRouter } from './routes/search.routes/search.router';
import { searchByTagRouter } from './routes/search.routes/search.by.tag.router';
import { eventRouter } from './routes/event.routes/event.router';
import { tagsRouter } from './routes/tags.routes/tags.router';

import {Notifications} from './sockets/notifications';

import { unknownPageHandler } from './helpers/unknown.page.handler';
import { errorHandler } from './helpers/error.handler';
import { requestLoggerMiddleware } from './helpers/request.logger.middleware';

const app: Application = express();
export const server = http.createServer(app);
export const io = socketIo(server);

app.use(cors({credentials: true, origin: process.env.FRONT_PATH}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(requestLoggerMiddleware);

app.get('/favicon.ico', (req: Request, res: Response) => res.status(204));
app.use('/', mainRouter);
app.use('/feed', feedRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/confirm', confirmUserRouter);
app.use('/forgot-password', forgotPassword);
app.use('/profile', profileRouter);
app.use('/likes', likesRouter);
app.use('/subscribers', subscribersRouter);
app.use('/following', followingRouter);
app.use('/comments', commentsRouter);
app.use('/search', searchRouter);
app.use('/search-tag', searchByTagRouter);
app.use('/events', eventRouter);
app.use('/tag', tagsRouter);
app.use(googleRouter);

const notifications = new Notifications('notifications', io);

// Symlinking client build to server directory appears to be a better solution
// Unfortunately Win/Linux link incompatibility hurdles this option
const STATIC_PATH: string = path.join(__dirname, process.env.STATIC_PATH);
app.use('/', express.static(STATIC_PATH));

app.use('*', unknownPageHandler);
app.use(errorHandler);
