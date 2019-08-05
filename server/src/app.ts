import { config } from 'dotenv';
import express, {Application, Request, Response, NextFunction} from 'express';
import connect from './connect';
import cors from 'cors';

import {requestLoggerMiddleware} from "../helpers/request.logger.middleware";

import {postRouter} from '../routes/post.router';
import {userRouter} from "../routes/user.router";

import {unknownPageHandler} from "../helpers/unknown.page.handler";

config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(requestLoggerMiddleware);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send('Hello');
// });

app.use('/post', postRouter);
app.use('/user', userRouter);

app.use('*', unknownPageHandler);

app.listen(8080, () => console.log('Listening...'));

const db = 'mongodb://localhost:27017/jsgram';
connect({db});


// npm run dev
