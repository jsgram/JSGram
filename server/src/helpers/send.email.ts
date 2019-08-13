import {IUserModel} from '../models/user.model';
import {NextFunction} from 'express';
import {ITokenModel, Token} from '../models/token.model';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const sendEmail = async (user: IUserModel,
                                message: (username: string, url: string) => void,
                                next: NextFunction): Promise<void> => {
    try {
        const {_id, email, username}: IUserModel = user;

        const token: ITokenModel = await Token.create({
            user: _id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const newToken = token.token;

        const mailOptions: { from: string, to: string, subject: string, html: any } = {
            from: 'jsgramsoftserve@gmail.com',
            to: email,
            subject: 'JSgram Account verification',
            html: message(username, newToken),
        };

        const successSend = await transporter.sendMail(mailOptions);
        if (!successSend) {
            throw new Error('Email wasn\'t sent');
        }
    } catch (e) {
        next(e);
    }
};
