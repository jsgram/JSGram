import {NextFunction, Request, Response} from 'express';
import {IUserModel, User} from '../../models/user.model';
import crypto from 'crypto';
import {ITokenModel, Token} from '../../models/token.model';
import nodemailer from 'nodemailer';

const existEmail = async (bodyEmail: string) => {

    if (!bodyEmail) {
        throw new Error('Email field is empty');
    }

    const user = await User.findOne({email: bodyEmail});
    if (!user) {
        throw new Error(`Email doesn't exist`);
    }

    return user;
};

const sendEmail = async (user: IUserModel) => {
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
    const url = `${process.env.BACK_PATH}/forgot-password/${newToken}`;

    const {email, username} = user;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'JSgram Account verification',
        // tslint:disable-next-line:max-line-length
        html: `<h1 style="color: lightcoral">Dear, ${username}, please click the <a href="${url}">link</a> to change your password</h1>`,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

export const checkEmail = async (req: Request,
                                 res: Response,
                                 next: NextFunction) => {
    try {
        const bodyEmail: string = req.body.email;

        const user = await existEmail(req.body.email);

        await sendEmail(user);
        res.json(
            // tslint:disable-next-line:max-line-length
            {status: `To change your password, please check your email: ${bodyEmail}`});
    } catch (e) {
        next(e);
    }
};
