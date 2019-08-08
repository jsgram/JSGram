import {NextFunction, Request, Response} from 'express';
import {IUserModel, User} from '../../models/user.model';
import {Token, ITokenModel} from '../../models/token.model';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const create = async (req: Request,
                             res: Response,
                             next: NextFunction) => {
  try {
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
    }: IUserModel = req.body;

    if (!email || !fullName || !username || !password) {
      throw new Error('Some field is empty');
    }

    const salt: string = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUNDS));
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

    const token: ITokenModel = await Token.create({
      user: createdUser._id,
      token: crypto.randomBytes(16).toString('hex'),
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const url = `${process.env.REACT_APP_BASE_API}/confirm/${token.token}`;

    const emailVerificationTemplate = '<table width="100%" cellpadding="8" cellspacing="0" style="font-family: Constantia;">\n' +
      '        <thead>\n' +
      '        <td style="vertical-align: top">\n' +
      '            <img src="https://scontent.fiev9-1.fna.fbcdn.net/v/t1.0-9/67803471_649342798898692_1093386776778637312_n.jpg?_nc_cat=110&_nc_oc=AQmy99m2Bn1Ft6Gmn8dfK_GXdp1SEdWxaPjStP0cQ0C0RITIFXczhHUfPZv9UT1qrWE&_nc_ht=scontent.fiev9-1.fna&oh=db72bf62323f628b2060a1c8dcc74900&oe=5DE02342" alt = " "  style="width: 200px" />\n' +
      '            <img src="https://wnet.ua/sites/default/files/Softserve-logo-RGB_0.png" alt = " "  style="width: 200px; float: right; margin: 35px 30px 0 0" />\n' +
      '        </td>\n' +
      '        </thead>\n' +
      '        <tfoot align="center" style="position: absolute; bottom: 0; width: 98%">\n' +
      '        <td style="font-size: 18px;">\n' +
      '        <a href="#" style="text-decoration: none; padding-right: 15px; color: red">About us</a>\n' +
      '        <a href="#" style="text-decoration: none; padding-right: 15px; color: red">Github</a>\n' +
      '        <a href="#" style="text-decoration: none; padding-right: 15px; color: red">Demos</a>\n' +
      '        <a href="#" style="text-decoration: none; padding-right: 15px; color: red">Softserve</a>\n' +
      '        <span style="padding-left: 50px">© JSgram</span>\n' +
      '        </td>\n' +
      '        </tfoot>\n' +
      '        <tbody align="center">\n' +
      '        <tr>\n' +
      '            <td style="font-size: 48px; font-weight: 700">Welcome to JSgram <span style="color: blue">' + fullName + '</span></td>\n' +
      '        </tr>\n' +
      '        <tr>\n' +
      '            <td style="font-size: 24px; line-height: 1.5; ">Thanks so much for joining JSgram!<br> To finish signing up, you just need to confirm\n' +
      '                that we got your email right.</td>\n' +
      '        </tr>\n' +
      '        <tr>\n' +
      '            <td style="font-size: 20px; padding-top: 30px; font-weight: 700"><a href=' + url + '>link</a></td>\n' +
      '        </tr>\n' +
      '        <tr>\n' +
      '            <td style="font-size: 18px">This link is available only 12 hour. Hurry up!</td>\n' +
      '        </tr>\n' +
      '        </tbody>\n' +
      '    </table>';

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'JSgram Account verification',
      html: `<h1 style="color: red">Hello, ${fullName}, +
        please verify your account +
        by clicking the <a href="${url}">link</a></h1>`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err);
      }
      res.json(
        {status: `A verification email has been sent to ${email}`});
    });

  } catch (e) {
    next(e);
  }
};
