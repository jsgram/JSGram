import {NextFunction, Request, Response} from 'express';
import {IUserModel, User} from '../../models/user.model';
import {Token, ITokenModel} from '../../models/token.model';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const createUser = async (user: IUserModel) => {
    const {
        email,
        fullName,
        username,
        password,
        dateOfBirth,
        createdAt,
        photoPath,
        bio,
        isAdmin,
        isVerified,
        posts,
    }: IUserModel = user;

    if (!email || !fullName || !username || !password) {
        throw new Error('Some field is empty');
    }

    const saltRounds: number = 12;

    const salt: string = bcrypt.genSaltSync(saltRounds);
    const hash: string = bcrypt.hashSync(password, salt);
    const emailExist = await User.countDocuments({email});
    if (emailExist) {
        throw new Error('The email address you have entered is ' +
            'already associated with another account');
    }

    const createdUser: IUserModel = await User.create({
        email,
        fullName,
        username,
        password: hash,
        dateOfBirth,
        createdAt,
        photoPath,
        bio,
        isAdmin,
        isVerified,
        posts,
    });
    if (!createdUser) {
        throw new Error('User didn\'t create');
    }

    return createdUser;
};

const sendEmail = async (user: IUserModel) => {
    const {_id, email, username} = user;
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

    const url = `${process.env.BACK_PATH!}/confirm/${token.token}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'JSgram Account verification',
        // tslint:disable-next-line:max-line-length
        html: `<h1 style="color: lightcoral">Congratulation, ${username}, click the <a href="${url}">link</a> to verify your account</h1>`,
    };

    const successSend = await transporter.sendMail(mailOptions);
    if (!successSend) {
        throw new Error('Email wasn\'t sent');
    }
};

export const create = async (req: Request,
                             res: Response,
                             next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        await sendEmail(user);
        res.json(
            {status: `A verification email has been sent to ${user.email}`});
    } catch (e) {
        next(e);
    }
};
