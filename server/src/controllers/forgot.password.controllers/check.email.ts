import {NextFunction, Request, Response} from 'express';
import {User} from '../../models/user.model';
import crypto from 'crypto';
import {ITokenModel, Token} from '../../models/token.model';
import nodemailer from 'nodemailer';

export const checkEmail = async (req: Request,
                                 res: Response,
                                 next: NextFunction) => {
    try {
        const bodyEmail: string = req.body.email;

        if (!bodyEmail) {
            throw new Error('Email field is empty');
        }

        const user = await User.findOne({email: bodyEmail});
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
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const newToken = token.token;
        const url = `http://${req.headers.host}/forgot-password/${newToken}`;

        const {email, fullName} = user;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'JSgram Account verification',
            // tslint:disable-next-line:max-line-length
            html: `<h1 style="color: lightcoral">Dear, ${fullName}, please click the <a href="${url}">link</a> to change your password</h1>`,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error(err);
            }
            res.json(
                // tslint:disable-next-line:max-line-length
                {status: `To change your password, please check your email: ${bodyEmail}`});
        });

    } catch (e) {
        next(e);
    }
};
