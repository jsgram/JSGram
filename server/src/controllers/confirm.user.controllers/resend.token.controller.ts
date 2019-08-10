import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/user.model';
import nodemailer from 'nodemailer';
import {ITokenModel, Token} from '../../models/token.model';
import crypto from 'crypto';

export const resend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        interface IEmail {
            email: string;
        }

        const {email}: IEmail = req.body;

        const user = await User.findOne({email});
        if (!user) {
            throw new Error(`Email doesn't exist`);
        }

        const token: ITokenModel = await Token.create({
            user: user._id,
            token: crypto.randomBytes(16).toString('hex'),
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jsgramsoftserve@gmail.com',
                pass: '[R3Jr<w2\'<2d7"[p',
            },
        });

        const url = `http://localhost:8080/confirm/${token.token}`;

        const mailOptions = {
            from: 'jsgramsoftserve@gmail.com',
            to: user.email,
            subject: 'JSgram Account verification',
            html: `<h1 style="color: red">Hello, ${user.username} , please verify your account by clicking the <a href="${url}">link</a></h1>`,
        };

        const successSend = await transporter.sendMail(mailOptions);
        if (!successSend) {
            throw new Error('Email wasn\'t sent');
        }

        res.json(
            {text: `A verification email has been sent to ${email}`});
    } catch (e) {
        next(e);
    }
};
