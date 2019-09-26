import { IUserModel } from '../models/user.model';
import nodemailer from 'nodemailer';

export const sendEmailHelper = async (user: IUserModel, emailBody: string): Promise<any> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    return await transporter.sendMail({
        from: 'jsgramsoftserve@gmail.com',
        to: user.email,
        subject: 'JSgram Account Reminder',
        html: emailBody,
    });
};
