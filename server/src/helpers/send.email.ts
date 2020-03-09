import { IUserModel } from '../models/user.model';
import nodemailer, { SentMessageInfo } from 'nodemailer';

export const sendEmail = async (
    user: IUserModel,
    emailSubject: string,
    emailBody: string,
): Promise<SentMessageInfo> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    return await transporter.sendMail({
        from: 'vrevura@gmail.com',
        to: user.email,
        subject: emailSubject,
        html: emailBody,
    });
};
